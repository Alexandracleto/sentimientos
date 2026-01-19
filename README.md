🎯 SentimentAPI - Frontend Dashboard (Amazon ES)
📋 Descripción
Interfaz de usuario interactiva desarrollada en React para el sistema de análisis de sentimientos de reseñas de Amazon en español. Este Frontend consume la API de inteligencia artificial y visualiza de forma dinámica el sistema homologado de clasificación emocional, métricas de estrellas y dashboards estadísticos.

📁 Estructura del Proyecto Frontend
Plaintext

sentimientos/
├── public/              # Archivos estáticos
├── src/
│   ├── App.js           # Lógica principal, Dashboard y Gráficos
│   ├── App.css          # Estilos personalizados (Glassmorphism & Gradients)
│   ├── index.js         # Punto de entrada de React
│   └── components/      # Componentes modulares
├── package.json         # Dependencias del proyecto
└── README.md            # Documentación de usabilidad
🚀 Instalación y Despliegue
1. Clonar el repositorio y acceder a la rama de desarrollo:

Bash

git clone https://github.com/Alexandracleto/sentimientos.git
cd sentimientos
git checkout Ale-dev
2. Instalar dependencias del ecosistema:

Bash

npm install
Dependencias principales: recharts (Gráficos), lucide-react (Iconografía), react-scripts.

3. Iniciar entorno de desarrollo:

Bash

npm start
4. Producción (Vercel): El proyecto cuenta con integración continua. Cada push a la rama principal genera un despliegue automático en la infraestructura de Vercel.

🔧 Usabilidad de la Interfaz
Entrada de Datos: El usuario ingresa el texto de la reseña en el área de procesamiento (limitado a 500 caracteres).

Análisis: Al accionar el botón "Analizar Sentimiento", se dispara un estado de carga (analyzing) que simula el tiempo de respuesta del modelo.

Interpretación: * Se muestra el Sentiment Label con colores dinámicos.

Se visualiza el Confidence Score mediante una barra de progreso animada.

Los Widgets de Estadísticas se actualizan en tiempo real sumando el nuevo registro al historial.

Pruebas Rápidas: Botones pre-configurados para testear respuestas Positivas, Negativas y Neutrales de forma inmediata.

💻 Conectividad con la API
El Frontend está diseñado para mapear el objeto JSON de respuesta:

JSON

{
  "sentiment": "positivo",
  "score": 0.9575,
  "text": "¡Este hackathon es increíble!"
}
🔧 Notas Técnicas (Frontend)
Estilos: No utiliza frameworks CSS externos (Tailwind/Bootstrap). Se implementó CSS Nativo con variables personalizadas y efectos de Glassmorphism (backdrop-filter).

Gráficos: Implementación de ResponsiveContainer para asegurar que el Dashboard sea visualmente correcto en móviles y escritorio.

Versión: 2.0.0 - Enero 2026.
