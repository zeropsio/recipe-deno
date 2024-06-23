# Zerops x Deno
This is the most bare-bones example of Deno app running on [Zerops](https://zerops.io) — as few libraries as possible, just a single connnect, read and write to a Postgres database.

![bun](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-deno.svg)

<br />

## Deploy on Zerops
You can either click the deploy button to deploy directly on Zerops, or manually copy the [import yaml](https://github.com/zeropsio/recipe-deno/blob/main/zerops-project-import.yml) to the import dialog in the Zerops app.

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/green/deploy-button.svg)](https://app.zerops.io/recipe/deno)

<br/>
<br/>

## Recipe features
- Deno app running.js on a load balanced **Zerops Deno** service
- Zerops **PostgreSQL 16** service as database
- Healthcheck setup example
- Utilization of Zerops' built-in **environment variables** system
- Utilization of Zerops' built-in **log management**

## Production vs. development
Base of the recipe is ready for production, the difference comes down to:

- Use highly available version of the PostgreSQL database (change `mode` from `NON_HA` to `HA` in recipe YAML, `db` service section)
- Use at least two containers for the Node.js service to achieve high reliability and resilience (add `minContainers: 2` in recipe YAML, `app` service section)

Futher things to think about when running more complex, highly available Bun production apps on Zerops:
- containers are volatile - use Zerops object storage to store your files
- use Zerops Redis (KeyDB) for caching, storing sessions and pub/sub messaging
- use more advanced logging lib, such as [Deno logger](https://github.com/deno-library/logger)

<br/>
<br/>

Need help setting your project up? Join [Zerops Discord community](https://discord.com/invite/WDvCZ54).
