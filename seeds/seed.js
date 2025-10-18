const dbName = 'personalbudget';
const col = 'budgetitems';

const items = [
  { title: 'Eat out',       value: 25,  color: '#FF6384' },
  { title: 'Rent',          value: 375, color: '#36A2EB' },
  { title: 'Groceries',     value: 110, color: '#FFCE56' },
  { title: 'Gas',           value: 40,  color: '#4BC0C0' },
  { title: 'Car insurance', value: 35,  color: '#9966FF' },
  { title: 'Savings',       value: 150, color: '#FF9F40' },
  { title: 'Entertainment', value: 30,  color: '#2ECC71' }
];

use(dbName);
db.getCollection(col).insertMany(items);
print(`Inserted ${items.length} items into ${dbName}.${col}`);
