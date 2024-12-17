const entryForm = document.getElementById('entry-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const resetButton = document.getElementById('reset-form');
const totalIncomeDisplay = document.getElementById('total-income');
const totalExpenseDisplay = document.getElementById('total-expense');
const netBalanceDisplay = document.getElementById('net-balance');
const entriesTable = document.getElementById('entries-table').querySelector('tbody');
const filters = document.querySelectorAll('input[name="radiovalue"]');

let entries = [];
let radiovalue = "all";

function updateSummary() {
    const totalIncome = entries
        .filter(entry => entry.type === 'income')
        .reduce((sum, entry) => sum + entry.amount, 0);
    const totalExpense = entries
        .filter(entry => entry.type === 'expense')
        .reduce((sum, entry) => sum + entry.amount, 0);
    const netBalance = totalIncome - totalExpense;

    totalIncomeDisplay.textContent = totalIncome;
    totalExpenseDisplay.textContent = totalExpense;
    netBalanceDisplay.textContent = netBalance;
}

function renderEntries() {
    entriesTable.innerHTML = '';
    entries
        .filter(entry => radiovalue === "all" || entry.type === radiovalue)
        .forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.description}</td>
                <td>${entry.amount}</td>
                <td>${entry.type}</td>
                <td class="actions">
                    <button class="edit" onclick="editEntry(${index})">Edit</button>
                    <button class="delete" onclick="deleteEntry(${index})">Delete</button>
                </td>
            `;
            entriesTable.appendChild(row);
        });
}

entryForm.addEventListener('submit', event => {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeSelect.value;

    if (description && amount > 0) {
        entries.push({ description, amount, type });
        entryForm.reset();
        updateSummary();
        renderEntries();
    }
});

resetButton.addEventListener('click', () => {
    entryForm.reset();
});

filters.forEach(radio => {
    radio.addEventListener('change', event => {
        radiovalue = event.target.value;
        renderEntries();
    });
});

function editEntry(index) {
    const entry = entries[index];
    descriptionInput.value = entry.description;
    amountInput.value = entry.amount;
    typeSelect.value = entry.type;

    entries.splice(index, 1);
    updateSummary();
    renderEntries();
}

function deleteEntry(index) {
    entries.splice(index, 1);
    updateSummary();
    renderEntries();
}

updateSummary();
renderEntries();
