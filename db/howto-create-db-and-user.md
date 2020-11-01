- connect to mongo shell to admin db (root@example) :

`$> mongo mongodb://localhost/admin -u root -p example`

`$> mongo mongodb://localhost/express-mongoose-es6-rest-api-development -u kerem -p kerem`

- switch to db you want to create user for :
  
  `mongo shell \$>use my-db`

- create user :
on mongo shell :
```js
// mongo shell \$> 
db.createUser({
  user: "kerem",
  pwd: "kerem",
  roles: [
    {
      role: "dbOwner",
      db: "perf-analytics",
    },
  ],
  mechanisms: ["SCRAM-SHA-1"],
});
````
- you may exit and test :

# Example Queries :

```js
db.metrics.find({ wl: 2665, site: ObjectId("5f90fdb4f245593795e70025") });
db.metrics.find(
  {
    sort: { createdAt: -1 },
    createdAt: { $gte: new ISODate("2020-10-31T18:09:34.617Z") },
    site: { $in: [ObjectId("5f9d8a6b243ca2112946f1bd")] },
  },
  { createdAt: 1 }
);

db.metrics.find(
  {
    sort: { createdAt: -1 },

    site: { $in: [ObjectId("5f9d8a6b243ca2112946f1bd")] },
  },
  { createdAt: 1 }
);
```
