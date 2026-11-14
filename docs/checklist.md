# Checklist de revisión

Se aplicó al código inicial de src/descuentos.js y a los requisitos originales, sin ejecutar pruebas funcionales.

| N.º | Pregunta | Resultado | Observación |
|-----|----------|-----------|-------------|
| 1 | ¿Cada requisito tiene un criterio medible? | No | Los cuatro requisitos originales son pobres. |
| 2 | ¿Los términos como rápido, importante o correcto están definidos? | No | Se corrige con RF-01 a RF-04. |
| 3 | ¿Cada requisito se puede probar con un caso concreto? | No | Se corrige con los ejemplos de RF-03 y RF-04. |
| 4 | ¿Cada RF está enlazado a un requisito original? | Sí | Tabla de la sección 4 de requisitos.md. |
| 5 | ¿Están anotados los supuestos pendientes y quién los confirma? | Sí | Tabla S-01 a S-06. |
| 6 | ¿La función valida que precio y porcentaje sean números válidos? | No | No hay ninguna validación. |
| 7 | ¿Se controla un porcentaje fuera del rango 0–100? | No | Solo imprime un mensaje y sigue calculando. |
| 8 | ¿El código evita var y usa const o let? | No | Usa var. |
| 9 | ¿Las comparaciones usan === en vez de ==? | No | Hay un == en la condición del VIP. |
| 10 | ¿Todos los if usan llaves? | No | Los dos if no tienen llaves. |
| 11 | ¿El código impide un total negativo cuando no hay promoción? | No | Con porcentaje mayor a 100 el total sale negativo. |
| 12 | ¿La lógica evita efectos secundarios como console.log? | No | Hay un console.log dentro de la función. |