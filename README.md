# Next.js And Wordpress Preview Mode

## How to install

```bash
docker compose up -d
docker compose exec wordpress /hack/init.sh
```

check following

http://localhost:8088/wp-admin/admin.php?page=graphql-settings
`Enable GraphQL Debug Mode` and `Enable Public Introspection`

Press Update Button
WP GraphQL Gutenberg Admin
http://localhost:8088/wp-admin/admin.php?page=wp-graphql-gutenberg-admin

login and get refresh_token

```sh
yarn codegen
```
