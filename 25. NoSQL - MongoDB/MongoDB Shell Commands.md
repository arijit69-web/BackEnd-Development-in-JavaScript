# MongoDB Shell Commands

## 1. createCollection() Method
- MongoDB **db.createCollection(name, options)** is used to create collection.

Syntax
Basic syntax of **createCollection()** command is as follows −

```shell
db.createCollection(name, options)
```

In the command, name is name of collection to be created. Options is a document and is used to specify configuration of collection.
>db refers to the current Database that we are using.

## 2. $and Operator

- This operator performs short-circuit evaluation.
- If the first expression of **$and** operator evaluates to false, then MongoDB will not evaluate the remaining expressions in the array.
- You can also use AND operation implicitly with the help of comma(, ).
- You can use AND operation explicitly (i.e., $and) when the same field or operator specified in multiple expressions.

Syntax
Basic syntax of **$and** command is as follows −

```shell
{ $and: [ { Expression1 }, { Expression2 }, ..., { ExpressionN } ] }
or
{ { Expression1 }, { Expression2 }, ..., { ExpressionN }}
```

## 3. Visit this link to know more about operators in MongoDB
- [LINK](https://www.mongodb.com/docs/manual/reference/operator/query/)