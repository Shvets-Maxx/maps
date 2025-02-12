// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useSearchParams } from "react-router-dom";

// const ADMIN_KEY = "adminsecret";
// const API_URL = "https://66b65cfab5ae2d11eb66aa31.mockapi.io/shop"

// const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//   iconSize: [32, 32],
// });

// function ProtectedPage({ children }) {
//   const [searchParams] = useSearchParams();
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (searchParams.get("admin") === ADMIN_KEY) {
//       setIsAdmin(true);
//     }
//   }, [searchParams]);

//   return children(isAdmin);  // Передаємо isAdmin в дочірні компоненти
// }

// function MapWithMarkers({ stores, onAddStore, onDeleteStore, onEditStore, isAdmin }) {
//   useMapEvents({
//     click(e) {
//       if (!isAdmin) return;
//       const name = prompt("Введіть назву магазину:");
//       const description = prompt("Введіть опис магазину:");
//       if (name && description) {
//         onAddStore({ name, description, lat: e.latlng.lat, lng: e.latlng.lng });
//       }
//     },
//   });

//   return (
//     <>
//       {stores.map((store) => (
//         <Marker key={store.id} position={[store.lat, store.lng]} icon={customIcon}>
//           <Popup>
//             <b>{store.name}</b>
//             <p>{store.description}</p>
//             {isAdmin && (
//               <>
//                 <button onClick={() => onDeleteStore(store.id)}>Видалити</button>
//                 <button
//                   onClick={() => {
//                     const newName = prompt("Нова назва:", store.name);
//                     const newDesc = prompt("Новий опис:", store.description);
//                     if (newName && newDesc) {
//                       onEditStore(store.id, newName, newDesc);
//                     }
//                   }}
//                 >Редагувати</button>
//               </>
//             )}
//           </Popup>
//         </Marker>
//       ))}
//     </>
//   );
// }

// function App() {
//   const [stores, setStores] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setStores(data))
//       .catch((err) => console.error("Помилка завантаження магазинів", err));
//   }, []);

//   const addStore = (store) => {
//     fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(store),
//     })
//       .then((res) => res.json())
//       .then((newStore) => setStores([...stores, newStore]));
//   };

//   const deleteStore = (id) => {
//     fetch(`${API_URL}/${id}`, { method: "DELETE" })
//       .then(() => setStores(stores.filter((s) => s.id !== id)));
//   };

//   const editStore = (id, name, description) => {
//     fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, description }),
//     })
//       .then(() =>
//         setStores(stores.map((s) => (s.id === id ? { ...s, name, description } : s)))
//       );
//   };

//   return (
//     <ProtectedPage>
//       {(isAdmin) => (
//         <MapContainer center={[50, 10]} zoom={3} style={{ height: "100vh", width: "100vw" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <MapWithMarkers
//             stores={stores}
//             onAddStore={addStore}
//             onDeleteStore={deleteStore}
//             onEditStore={editStore}
//             isAdmin={isAdmin}
//           />
//         </MapContainer>
//       )}
//     </ProtectedPage>
//   );
// }

// export default App;
// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Мокап API URL
// const API_URL = "https://your-mockapi-url.com/stores"; // Замініть на ваш MockAPI URL

// // Стилі для значка мітки
// const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Можна замінити на свій
//   iconSize: [40, 40], // Збільшений розмір
//   iconAnchor: [20, 40], // Позиціонування мітки
//   popupAnchor: [0, -40], // Місце відображення спливаючого вікна
// });

// function App() {
//   const [stores, setStores] = useState([]);

//   // Завантаження магазинів із API
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setStores(data))
//       .catch((err) => console.error("Помилка завантаження магазинів", err));
//   }, []);

//   // Додавання магазину
//   const addStore = (store) => {
//     fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(store),
//     })
//       .then((res) => res.json())
//       .then((newStore) => setStores([...stores, newStore]));
//   };

//   // Видалення магазину
//   const deleteStore = (id) => {
//     fetch(`${API_URL}/${id}`, { method: "DELETE" })
//       .then(() => setStores(stores.filter((s) => s.id !== id)));
//   };

//   // Редагування магазину
//   const editStore = (id, name, description) => {
//     fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, description }),
//     })
//       .then(() =>
//         setStores(stores.map((s) => (s.id === id ? { ...s, name, description } : s)))
//       );
//   };

//   return (
//     <MapContainer
//       center={[50, 10]} // Початкове положення карти
//       zoom={13} // Початковий рівень масштабування
//       style={{ height: "100vh", width: "100vw" }}
//     >
//       {/* Плитки OpenStreetMap */}
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {/* Мітки на карті */}
//       {stores.map((store) => (
//         <Marker key={store.id} position={[store.lat, store.lng]} icon={customIcon}>
//           <Popup>
//             <b>{store.name}</b>
//             <p>{store.description}</p>
//             {/* Адмін панель для редагування та видалення */}
//             <button onClick={() => deleteStore(store.id)}>Видалити</button>
//             <button
//               onClick={() => {
//                 const newName = prompt("Нова назва:", store.name);
//                 const newDesc = prompt("Новий опис:", store.description);
//                 if (newName && newDesc) {
//                   editStore(store.id, newName, newDesc);
//                 }
//               }}
//             >
//               Редагувати
//             </button>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

// export default App;



import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";

const ADMIN_KEY = "adminsecret";
const API_URL = "https://66b65cfab5ae2d11eb66aa31.mockapi.io/shop "; // Замініть на свій MockAPI URL

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

function ProtectedPage({ children }) {
  const [searchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (searchParams.get("admin") === ADMIN_KEY) {
      setIsAdmin(true);
    }
  }, [searchParams]);

  return children(isAdmin);  // Передаємо isAdmin в дочірні компоненти
}

function MapWithMarkers({ stores, onAddStore, onDeleteStore, onEditStore, isAdmin }) {
  useMapEvents({
    click(e) {
      if (!isAdmin) return;
      const name = prompt("Введіть назву магазину:");
      const description = prompt("Введіть опис магазину:");
      if (name && description) {
        onAddStore({ name, description, lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });

  return (
    <>
      {stores.map((store) => (
        <Marker key={store.id} position={[store.lat, store.lng]} icon={customIcon}>
          <Popup>
            <b>{store.name}</b>
            <p>{store.description}</p>
            {isAdmin && (
              <>
                <button onClick={() => onDeleteStore(store.id)}>Видалити</button>
                <button
                  onClick={() => {
                    const newName = prompt("Нова назва:", store.name);
                    const newDesc = prompt("Новий опис:", store.description);
                    if (newName && newDesc) {
                      onEditStore(store.id, newName, newDesc);
                    }
                  }}
                >Редагувати</button>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function App() {
  const [stores, setStores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((err) => console.error("Помилка завантаження магазинів", err));
  }, []);

  const addStore = (store) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    })
      .then((res) => res.json())
      .then((newStore) => setStores([...stores, newStore]));
  };

  const deleteStore = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setStores(stores.filter((s) => s.id !== id)));
  };

  const editStore = (id, name, description) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then(() =>
        setStores(stores.map((s) => (s.id === id ? { ...s, name, description } : s)))
      );
  };

  return (
    <ProtectedPage>
      {(isAdmin) => (
        <MapContainer center={[50, 10]} zoom={3} style={{ height: "100vh", width: "100vw" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapWithMarkers
            stores={stores}
            onAddStore={addStore}
            onDeleteStore={deleteStore}
            onEditStore={editStore}
            isAdmin={isAdmin}
          />
        </MapContainer>
      )}
    </ProtectedPage>
  );
}

export default App;
