
    // Llamamos a la dependencia
    import legacy from '@vitejs/plugin-legacy';
    // Sacamos el metodo defineConfig
    import { defineConfig } from 'vite';
    // Dejamos que la función sea exportable
    export default defineConfig({
        // Se configura el plugin para retro compatibilidad
        plugins: [
            legacy({
            polyfills: ['es.promise.finally', 'es/map', 'es/set'],
            modernPolyfills: ['es.promise.finally']
            })
        ],
        build: {
		manifest: true,
	    },
        // Se agrega la base carpeta donde se encuentra el proyecto
        base: '/vite-test-one/',
    });
