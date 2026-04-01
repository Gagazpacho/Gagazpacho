# Website Content Management Guide

Welcome! This guide will help you add new items or change pictures on your website without needing to touch any code that changes the layout or structure. Follow these simple steps:

---

## 1. Adding or Editing Items (Products/Projects)

### Where to Edit:
- **File:** `app/data/projects.js` (for projects)
- **File:** `app/data/shop/products.ts` (for shop items)

### How to Add a New Item:
1. **Open the file** in a text editor (like VS Code or Notepad).
2. **Find the list/array** of items. Each item is usually inside `{ ... }` curly brackets.
3. **Copy an existing item** (from `{` to `}`), then paste it below to use as a template.
4. **Change the details** (like name, description, image path, price, etc.) to match your new item.
5. **Save the file.**

### How to Edit an Existing Item:
- Just find the item you want to change and update its details (text, image path, etc.).

---

## 2. Changing or Adding Pictures

### Where to Place Images:
- **Folder:** `public/images/`
- Inside this folder, you’ll find subfolders for each project, shop item, or category.

### How to Add a New Image:
1. **Prepare your image** (JPG, PNG, or WEBP format is best).
2. **Name your image** clearly (e.g., `new-artwork.jpg`).
3. **Upload or copy** your image into the correct subfolder inside `public/images/`.
   - For example, for a new project called “Sunset”, put the image in `public/images/0.SELECCIÓN WEB PRINTS/Sunset/`.
4. **Update the image path** in the data file (like `projects.js` or `products.ts`) to match the new image location.
   - Example: `"/images/0.SELECCIÓN WEB PRINTS/Sunset/new-artwork.jpg"`

### How to Replace an Existing Image:
- **Overwrite the old image file** with your new one (use the same file name), or
- **Change the image path** in the data file to point to your new image.

---

## 3. Tips
- Always keep a backup of your files before making changes.
- Refresh your website after saving changes to see updates.
- If you don’t see changes, try clearing your browser cache.

---

If you need more help, feel free to contact your developer!
