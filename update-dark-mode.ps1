# Script para actualizar todas las páginas con modo oscuro
# Ejecutar desde la carpeta raíz del proyecto

$pages = @(
    "a1\abecedario.html",
    "a1\articulos.html", 
    "a1\numeros-colores.html",
    "a1\preguntas-basicas.html",
    "a1\verbo-to-be.html",
    "a2\conversaciones-breves.html",
    "a2\pasado-simple.html",
    "a2\preposiciones-lugar.html",
    "a2\presente-simple.html",
    "a2\vocabulario-esencial.html",
    "b1\comparativos-superlativos.html",
    "b1\comprension-textos.html",
    "b1\condicionales-futuro.html",
    "b1\presente-perfecto.html",
    "b1\vocabulario-tematico.html",
    "b2\analisis-textos.html",
    "b2\expresiones-idiomaticas.html",
    "b2\modal-verbs.html",
    "b2\reported-speech.html",
    "b2\second-conditional.html"
)

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "Actualizando $page..."
        
        $content = Get-Content $page -Raw
        
        # Actualizar body
        $content = $content -replace '<body([^>]*)>', '<body$1 class="bg-custom-white dark:bg-custom-black text-custom-black dark:text-custom-white transition-colors duration-300">'
        
        # Actualizar navegación
        $content = $content -replace 'class="([^"]*bg-white[^"]*)">([^<]*<nav)', 'class="$1 dark:bg-custom-black/95 transition-colors duration-300">$2'
        
        # Actualizar títulos principales
        $content = $content -replace 'class="([^"]*text-custom-black[^"]*)">([^<]*<h[1-6])', 'class="$1 dark:text-custom-white transition-colors duration-300">$2'
        
        # Actualizar enlaces
        $content = $content -replace 'class="([^"]*text-custom-black[^"]*hover[^"]*)">([^<]*<a)', 'class="$1 dark:text-custom-white transition-colors duration-300">$2'
        
        # Guardar cambios
        Set-Content $page -Value $content -Encoding UTF8
        
        Write-Host "✓ $page actualizado"
    } else {
        Write-Host "⚠ $page no encontrado"
    }
}

Write-Host "\n✅ Actualización completada para todas las páginas"