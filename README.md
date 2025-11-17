# Product Management App

A simple **Product Management App** built with **HTML, CSS, and JavaScript**.  
Allows you to **create, read, update, delete (CRUD)** products with additional features like **dark mode toggle**, **live search**, and **automatic total calculation**.

---

## **Features**

- **Dark Mode Toggle**:  
  Switch between light and dark themes. Your preference is saved in `localStorage`.

- **CRUD Operations**:  
  - **Create** new products with details like title, price, taxes, ads, discount, category, and count.  
  - **Read**: Display products in a table with dynamic total calculation.  
  - **Update** existing products.  
  - **Delete** single product or all products at once.  

- **Live Total Calculation**:  
  Automatically calculates total price including taxes, ads, and discount while typing.

- **Search Products**:  
  - Search by **Title** or **Category**.  
  - Displays a "No data" message if no products match the search.

- **Input Validation**:  
  - Sanitizes text input to prevent invalid characters.  
  - Validates numeric fields to prevent negative values.

- **Persistent Storage**:  
  Products and dark mode preference are stored in `localStorage` so data persists across sessions.

---

## **Technologies Used**

- HTML
- CSS
- JavaScript (Vanilla)
- `localStorage` for persistent data

---

## **Setup & Usage**

1. **Clone or download the project**:

   ```bash
   git clone https://github.com/bakror/product-Management-App.git

Open index.html in a browser.

Use the App:

- Toggle dark mode using the checkbox.

- Fill in product details and click Create.

- Use the search bar to find products by Title or Category.

- Click update to edit a product or delete to remove it.

- Click Delete All to clear all products.
  
---

## Folder Structure

```
project-folder/
│
├─ index.html      # Main HTML file
├─ main.css       # CSS for styling and dark mode
├─ index.js       # JavaScript logic for CRUD, search, and dark mode
└─ README.md       # Project documentation```
---

License

This project is open source and free to use.
# product-Management-App
