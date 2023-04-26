# Object-Oriented Programming System in JS

## Classes & Objects

- `Blueprint` -> Mental model of how real life entities will look like.

```bash
Product       -
├── name       |  
├── price      |   --> data members
├── rating     |
├── desc       |
              -

buyProduct() | wishListProduct() | addToCartProduct() ]-> member functions
```
- In technical terms, the `Blueprint` is called a `Class`.

- Using the `Blueprint` u can create multiple `Objects`.

- We can uniquely identify two objects based on their properties, but their behavior is the same.

```
class <name>{
    <properties>
    <behaviour>
}
```
- Using this above blueprint we can create real life entities.
- To create and manage entities we have 2 new keywords `new` and `this`.

## `this` keyword

- Except 1 case, `this` keyword always refers to the calling site/context.

> That 1 case is : Inside arrow functions `this` keyword does not refers to the calling context.