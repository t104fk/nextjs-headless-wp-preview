FROM wordpress
ARG WP_GRAPHQL_VERSION=1.12.0
# DON'T WORK 0.3.12
ARG WP_GRAPHQL_GUTENBERG_VERSION=v0.3.11
ARG WP_GRAPHQL_JWT_AUTHENTICATION_VERSION=v0.6.0

RUN apt-get update && apt-get install -y vim unzip

# download plugins
WORKDIR /tmp/wp-plugins
RUN curl -L https://downloads.wordpress.org/plugin/wp-graphql.${WP_GRAPHQL_VERSION}.zip -o wp-graphql.zip
RUN curl -L https://github.com/pristas-peter/wp-graphql-gutenberg/archive/refs/tags/${WP_GRAPHQL_GUTENBERG_VERSION}.zip -o wp-graphql-gutenberg.zip
RUN curl -L https://github.com/wp-graphql/wp-graphql-jwt-authentication/archive/refs/tags/${WP_GRAPHQL_JWT_AUTHENTICATION_VERSION}.zip -o wp-graphql-jwt-authentication.zip
RUN unzip './*.zip' -d /usr/src/wordpress/wp-content/plugins
RUN echo "define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'hlYtRKO7J3LxMeZ0vIWdEzCJ');" >> /usr/src/wordpress/wp-config-docker.php
RUN echo "// Replace preview link\n\
  function preview_link(\$link) {\n\
  global \$post;\n\
  \$secret = 'hlYtRKO7J3LxMeZ0vIWdEzCJ';\n\
  \$new_link = 'http://localhost:3000/api/preview?secret='.\$secret.'&slug='.\$post->post_name;\n\
  return \$new_link;\n\
  }\n\
  add_filter('preview_post_link', 'preview_link');\n\
  " >> /usr/src/wordpress/wp-content/themes/twentytwentytwo/functions.php

# remove unnessary plugins
RUN rm -r /usr/src/wordpress/wp-content/plugins/akismet
RUN rm  /usr/src/wordpress/wp-content/plugins/hello.php

# install WP CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  && chmod +x wp-cli.phar \
  && mv wp-cli.phar /usr/local/bin/wp
ENV WP_CLI_ALLOW_ROOT=1
COPY --chmod=0755 ./hack/* /hack/
WORKDIR /var/www/html
