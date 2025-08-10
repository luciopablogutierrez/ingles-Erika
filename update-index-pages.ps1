# Script para actualizar todas las paginas de indice de nivel con modo oscuro
# Ejecutar desde la carpeta raiz del proyecto

$indexPages = @(
    "a2\index.html",
    "b1\index.html",
    "b2\index.html",
    "c1\index.html"
)

foreach ($page in $indexPages) {
    if (Test-Path $page) {
        Write-Host "Actualizando $page..."
        
        $content = Get-Content $page -Raw
        
        # Agregar darkMode: 'class' a la configuracion de Tailwind
        $content = $content -replace "tailwind\.config = \{\s*theme:", "tailwind.config = {`n            darkMode: 'class',`n            theme:"
        
        # Agregar custom-gray-dark a los colores
        $content = $content -replace "'custom-gray-light': '#f5f5f5'", "'custom-gray-light': '#f5f5f5',`n                        'custom-gray-dark': '#222222'"
        
        # Actualizar body
        $content = $content -replace '<body>', '<body class="bg-custom-white dark:bg-custom-black text-custom-black dark:text-custom-white transition-colors duration-300">'
        
        # Actualizar header
        $content = $content -replace 'class="bg-white shadow-lg sticky top-0 z-40">', 'class="bg-white dark:bg-custom-black shadow-lg sticky top-0 z-40 transition-colors duration-300">'
        
        # Actualizar titulo principal
        $content = $content -replace 'class="text-lg sm:text-xl font-bold text-custom-black font-heading hidden xs:block">', 'class="text-lg sm:text-xl font-bold text-custom-black dark:text-custom-white font-heading hidden xs:block transition-colors duration-300">'
        
        # Actualizar lineas del hamburger
        $content = $content -replace 'class="hamburger-line block w-6 h-0\.5 bg-custom-black-light transition-all duration-300">', 'class="hamburger-line block w-6 h-0.5 bg-custom-black-light dark:bg-custom-white transition-all duration-300">'
        
        # Guardar cambios
        Set-Content $page -Value $content -Encoding UTF8
        
        Write-Host "Completado: $page"
    } else {
        Write-Host "No encontrado: $page"
    }
}

Write-Host "Actualizacion completada para todas las paginas de indice"