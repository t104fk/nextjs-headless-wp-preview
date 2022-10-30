#!/bin/bash
wp core install --title='Next.js Preview Mode' \
  --admin_user=example \
  --admin_email=example@example.com \
  --admin_password=hogehoge \
  --url=http://localhost:8088
wp plugin activate --all
wp option update permalink_structure /posts/%postname%/
# DON'T WORK
wp option patch update graphql_general_settings debug_mode_enabled on
