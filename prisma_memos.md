## prisma を使ったアプリケーションを作成する順序

### まず prisma にデータを入れる

prisma/schema.prisma
<br>
下記を追加

```sql
model Vegetable {
    id Int @id @default(autoincrement())
    name String
    description String?
    stock Int
    price Float
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

prisma/seed.js

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.vegetable.createMany({
    data: [
      {
        name: "Tomato",
        price: 2.5,
        description: "Fresh red tomatoes",
        stock: 100,
      },
      {
        name: "Cucumber",
        price: 1.75,
        description: "Crunchy cucumbers",
        stock: 150,
      },
      {
        name: "Carrot",
        price: 1.2,
        description: "Organic carrots",
        stock: 200,
      },
      {
        name: "Lettuce",
        price: 1.0,
        description: "Crispy green lettuce",
        stock: 80,
      },
      {
        name: "Bell Pepper",
        price: 2.0,
        description: "Colorful bell peppers",
        stock: 60,
      },
      {
        name: "Broccoli",
        price: 2.25,
        description: "Fresh broccoli heads",
        stock: 70,
      },
      {
        name: "Spinach",
        price: 1.5,
        description: "Healthy spinach leaves",
        stock: 90,
      },
      {
        name: "Potato",
        price: 1.0,
        description: "Versatile potatoes",
        stock: 300,
      },
      {
        name: "Onion",
        price: 1.25,
        description: "Golden onions",
        stock: 120,
      },
      {
        name: "Garlic",
        price: 3.0,
        description: "Aromatic garlic bulbs",
        stock: 50,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```bash
node prisma/seed.js
```

#### 確認

```bash
prisma studio
```

### html に表示する方法

routes/super.js

```js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 全ての野菜を取得してHTMLで表示
router.get("/", async (req, res) => {
  const vegetables = await prisma.vegetable.findMany();
  res.render("vegetables", { vegetables });
});
```

views/vegetables/index.ejs

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vegetable List</title>
    <link rel="stylesheet" href="/styles.css">
</head>

<body>
    <h1>Vegetable List</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            <% vegetables.forEach(vegetable=> { %>
                <tr>
                    <td>
                        <%= vegetable.name %>
                    </td>
                    <td>
                        <%= vegetable.price %>
                    </td>
                    <td>
                        <%= vegetable.description %>
                    </td>
                    <td>
                        <%= vegetable.stock %>
                    </td>
                </tr>
                <% }) %>
        </tbody>
    </table>
</body>

</html>
```

app.js
<br>
下記を追加

```js
var supreRouter = require("./routes/super");
app.use("/super", supreRouter);
```
