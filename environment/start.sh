#!/bin/bash

ENV="${ENV:-development}"
printf "🌷 starting server with ${ENV} variables \n\n"

source "environment/env.${ENV}.op"

TEMP_ENV=$(mktemp)
trap "rm -f $TEMP_ENV" EXIT

while IFS= read -r VAR || [[ -n "$VAR" ]]; do
  [[ -z "$VAR" || "$VAR" == \#* ]] && continue
  echo "${VAR}=${REFERENCE}${VAR}" >> "$TEMP_ENV"
done < environment/variables.op

op run --no-masking --account "$ACCOUNT" --env-file="$TEMP_ENV" -- next dev
