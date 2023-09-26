let items = [];

function addItem() {
    const itemName = document.getElementById("itemName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    if (itemName && !isNaN(quantity) && !isNaN(price)) {
        const total = quantity * price;
        items.push({ itemName, quantity, price, total });
        updateInvoiceTable();
        calculateTotal();
        clearInputs();
    } else {
        alert("Please enter valid values for quantity and price.");
    }
}

function updateInvoiceTable() {
    const tableBody = document.querySelector("#invoiceTable tbody");
    tableBody.innerHTML = "";

    for (const item of items) {
        const row = tableBody.insertRow();
        row.insertCell().textContent = item.itemName;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = item.price;
        row.insertCell().textContent = item.total;
    }
}

function calculateTotal() {
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}

function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}

function printAndSave() {
    const invoiceText = generateInvoiceText();
    const blob = new Blob([invoiceText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "billing.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Reset the items array and table after saving
    items = [];
    updateInvoiceTable();
    calculateTotal();
}

function generateInvoiceText() {
    let invoiceText = "Invoice:\n\n";
    for (const item of items) {
        invoiceText += `Item Name: ${item.itemName}\n`;
        invoiceText += `Quantity: ${item.quantity}\n`;
        invoiceText += `Price per Unit: ${item.price}\n`;
        invoiceText += `Total: ${item.total}\n\n`;
    }
    invoiceText += `Total Amount: ${document.getElementById("totalAmount").textContent}`;

    return invoiceText;
}