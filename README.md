# Basic e-commerce

For learning -- unsure if these are best practices -- will refactor in a future side porject

## Tech

### Frontend
1. React (Vite)
2. TailwindCSS
3. TypeScript

### Backend
1. NodeJS 
2. TypeScript
3. MongoDB


### Authentication

- JWT

### This was copied from my previous e2e_auth template repo

#### Goals:

1. Product Page
   - create backend CRUD
     - data model
     - seed a few products
     - 

2. Carts  
3. Checkout (no payments yet)
4. Orders page

Others;
- Unit tests pipeline


Work in progress:

![Alt text](image.png)


### Todo's
"Tasks"
1. loading component
2. re-do logos
3. color scheming and themes
4. context api
5. authentication and authenticated calls
6. admin panels -- larger, expand this topic 
7. clean up product components
8. generalize product components
9. more products -- conceptualize and seed db
10. product list page filters
11. product list page sort
12. product list page pagination
13. consider graphql
14. consider localization
15. set up jest in the frontend
16. set up integration test in the frontend
17. consider gift cards
18. consider product reviews
19. add style guide
20. add stricter linting
21. add unit test CI step (FE)
22. add integration test CI step (FE)
23. add unit test CI step (BE)
24. add integration test CI step(BE)
25. add frontend deploy
26. add backend deploy
27. plan carts page
28. plan checkout page
29. plan order page
30. redesign footer
31. redesign header
32. plan account details page
33. /products/:productId page
34. set up frontend error handling
35. 404 not found page
36. set up frontend environment variables
37. set up prices on product page
38. protect main branch (main <- release <- develop)
39. set up pagination in backend


#### Task details
1.  /products/:productId page
when clicking on product from product list
- navigate to a specific product page
- 

1.  -
- add a notification toast for errors
- error page

#### Releases



#### Tech debt
- HMR on new files -- can this be achieved?
- Clean up the pages


#### Improvement ideas:
** (getting some ideas from lululemon website. will check other stores too)

- product list:
  -  ability to add to favorite
- /products/:productId:
  - select sizes
    - product sizes
      - each size has its own quantity/inventory
      - check inventory per store
  - suggestions ("you may also like...")
  - reviews
  - rating system
- gift cards


#### Other ideas:
- try adding openAI to PR reviews:
https://pretius.com/blog/open-ai-code-review/


