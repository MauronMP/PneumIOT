## Framework

For the project development, Node.js with the Express framework was chosen for the backend. This decision was made due to the extensive community and documentation available, as well as the flexibility and speed that Express offers in creating RESTful APIs, which is crucial for interacting with IoT devices.

The backend will be connected to a PostgreSQL database, a solid choice due to its ability to handle large volumes of data and its robustness in production environments. A data access model will be implemented using a "single source of truth" architecture, and dependency injection will be applied to ensure clean and maintainable code.

For the frontend, React will be used to build the user interface. React is a popular and powerful choice for developing interactive and dynamic user interfaces. This will be crucial to providing a smooth and intuitive user experience on the IoT platform.

The project will be developed following a layered architecture, clearly separating the business logic of the backend, the API logic, and the user interface. Special attention will be paid to documentation, ensuring that API routes and endpoints are properly defined and align with the established user stories.

Additionally, practices such as distributed configuration will be implemented to effectively handle different development, testing, and production environments. Logs will be used to monitor and diagnose system operation, selecting the appropriate tools for this purpose.

Finally, comprehensive testing will be conducted to ensure the proper functioning of the system and its compliance with established user stories. This will include unit, integration, and performance testing as necessary. The project will continue its development following the guidelines established in previous milestones, maintaining a clear structure and meeting established quality standards.
