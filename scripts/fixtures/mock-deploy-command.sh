#!/usr/bin/env bash
# Test-only command replacements: no Docker daemon, network, or root access.
set -euo pipefail
command_name=${0##*/}
printf '%s %s\n' "$command_name" "$*" >> "$DEPLOY_TEST_LOG"

case "$command_name" in
  sudo)
    case "$1" in
      test)
        [ "$DEPLOY_TEST_SCENARIO" != new_certificate ]
        ;;
      env)
        shift
        export "$1"
        shift
        exec "$@"
        ;;
      docker|mkdir|tee)
        exec "$@"
        ;;
      *) exit 97 ;;
    esac
    ;;
  timeout)
    shift 2
    exec "$@"
    ;;
  docker)
    case " $* " in
      *' info '*)
        [ "$DEPLOY_TEST_SCENARIO" != docker_unavailable ] || exit 1
        ;;
      *' image inspect '*)
        case "$DEPLOY_TEST_SCENARIO" in
          load_failure|missing_archive|invalid_archive) exit 1 ;;
          first_images) [ -f "$DEPLOY_TEST_COUNTER.loaded" ] || exit 1 ;;
        esac
        ;;
      *' build '*)
        case "$DEPLOY_TEST_SCENARIO" in
          build_failure) exit 1 ;;
          build_timeout) exit 124 ;;
          stale_sources)
            while IFS= read -r retired; do
              if [ -e "$retired" ]; then
                echo "Retired source reached Docker build: ${retired}" >&2
                exit 1
              fi
            done < "$DEPLOY_TEST_RETIRED_SOURCES"
            ;;
        esac
        ;;
      *' image load '*)
        [ "$DEPLOY_TEST_SCENARIO" != load_failure ] || exit 1
        touch "$DEPLOY_TEST_COUNTER.loaded"
        ;;
      *' up '*frontend*)
        [ "$DEPLOY_TEST_SCENARIO" != start_failure ] || exit 1
        ;;
    esac
    ;;
  curl)
    url=${!#}
    case "$url" in
      http://127.0.0.1:3001/api/health)
        [ "$DEPLOY_TEST_SCENARIO" != api_failure ] || exit 22
        if [ "$DEPLOY_TEST_SCENARIO" = slow_start ]; then
          count=0
          if [ -f "$DEPLOY_TEST_COUNTER" ]; then
            read -r count < "$DEPLOY_TEST_COUNTER"
          fi
          printf '%s\n' "$((count + 1))" > "$DEPLOY_TEST_COUNTER"
          [ "$count" -ge 2 ] || exit 7
        fi
        ;;
      http://127.0.0.1:5173/)
        [ "$DEPLOY_TEST_SCENARIO" != frontend_failure ] || exit 22
        ;;
      https://e-systems.su/*)
        [ "$DEPLOY_TEST_SCENARIO" != https_failure ] || exit 22
        ;;
      http://127.0.0.1/.well-known/acme-challenge/ping)
        printf 'ok\n'
        ;;
      *) exit 97 ;;
    esac
    ;;
  sleep) ;;
  *) exit 97 ;;
esac
exit 0
