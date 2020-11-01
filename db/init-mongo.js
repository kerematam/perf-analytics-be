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
db.createCollection("deleteMe", {});
