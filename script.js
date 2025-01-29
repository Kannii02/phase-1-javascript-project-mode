document.getElementById("search").addEventListener("keyup", function(e) {
    let searchTerm = e.target.value.toLowerCase();

    fetch("http://localhost:3000/services")
        .then(response => response.json())
        .then(services => {
            let filteredServices = services.filter(service =>
                service.title.toLowerCase().includes(searchTerm) ||
                service.category.toLowerCase().includes(searchTerm) ||
                service.description.toLowerCase().includes(searchTerm) ||
                service.location.toLowerCase().includes(searchTerm)
            );
            displayServices(filteredServices);
        })
        .catch(error => console.error("Error filtering services:", error));
});

function displayServices(services) {
    let serviceList = document.getElementById("service-list");
    serviceList.innerHTML = ""; 

    services.forEach(service => {
        let serviceCard = document.createElement("div");
        serviceCard.classList.add("service-card");

        serviceCard.innerHTML = `
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <p><strong>Category:</strong> ${service.category}</p>
            <p><strong>Price:</strong> $${service.price}</p>
            <p><strong>Location:</strong> ${service.location}</p>
            <p><strong>Contact:</strong> ${service.contact}</p>
        `;

        serviceList.appendChild(serviceCard);
    });
}

document.getElementById("post-service-btn").addEventListener("click", function() {
    document.getElementById("post-form-container").style.display = "block";
});

document.getElementById("post-form").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let newService = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        price: parseFloat(document.getElementById("price").value),
        location: document.getElementById("location").value,
        availability: document.getElementById("availability").value.split(","),
        contact: document.getElementById("contact").value
    };

    fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService)
    })
    .then(response => response.json())
    .then(() => {
        alert("Service Posted Successfully!");
        document.getElementById("post-form").reset();
        document.getElementById("post-form-container").style.display = "none";
        fetchServices(); 
    })
    .catch(error => console.error("Error adding service:", error));
});

