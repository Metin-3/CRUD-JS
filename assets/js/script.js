const apiUrl = 'https://655f2b37879575426b44b8f7.mockapi.io/person';
const itemList = document.getElementById('itemList');
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
let editItemId = null;

//! GET
async function fetchItems() {
    try {
        const response = await axios.get(apiUrl);
        itemList.innerHTML = '';
        response.data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name}
               <div>
                    <button onclick="deleteItem('${item.id}')">Sil</button>
                    <button onclick="editItemForm('${item.id}', '${item.name}')">Dəyiş</button>
               </div>
            `;
            itemList.appendChild(li);
        });
    } catch (error) {
        console.error('Itemləri gətirməkdə səhv:', error);
    }
}

//! POST
async function addItem() {
    const newItem = { name: itemInput.value };

    try {
        await axios.post(apiUrl, newItem);
        itemInput.value = '';
        fetchItems();
    } catch (error) {
        console.error('Item əlavə etmədə səhv:', error);
    }
}

//! PUT
async function editItem() {
    const updatedItem = { name: itemInput.value };

    try {
        await axios.put(`${apiUrl}/${editItemId}`, updatedItem);
        editItemId = null;
        itemInput.value = '';
        fetchItems();
    } catch (error) {
        console.error('Item dəyişdirmədə səhv:', error);
    }
}

//!  DELETE
async function deleteItem(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchItems();
    } catch (error) {
        console.error('Itemi silməkdə səhv:', error);
    }
};

//! Edit formunu doldurmaq üçün funksiya
function editItemForm(id, name) {
    editItemId = id;
    itemInput.value = name;
}

//! Formun submit olunduğunda addItem və ya editItem funksiyalarından birini çağırırıq
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (editItemId) {
        editItem();
    } else {
        addItem();
    }
});

fetchItems();