# Prisma Migration Commands

## Create and apply a new migration

After modifying `schema.prisma`:

```bash
npx prisma migrate dev --name <migration_name>
```

Example:

```bash
npx prisma migrate dev --name add_recurring_expenses
```

This command:

- Creates a new migration
- Applies it to your local database
- Regenerates the Prisma Client

---

## Regenerate Prisma Client only

```bash
npx prisma generate
```

Use this if you changed the schema but don't need a migration.

---

## Apply migrations in production

```bash
npx prisma migrate deploy
```

Applies existing migrations without creating new ones.

---

## Open Prisma Studio

```bash
npx prisma studio
```

Opens a browser UI to inspect and edit your database.