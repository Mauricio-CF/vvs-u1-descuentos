# Acta de inspección por pares

## 1. Datos generales

| Campo | Detalle |
|-------|---------|
| Módulo inspeccionado | src/descuentos.js |
| Fecha | 14/11/2026 |
| Autor | Jaime Carvajal |
| Revisor | Jaime Carvajal |
| Registrador | Jaime Carvajal |
| Método | Checklist (docs/checklist.md), lectura del código y análisis estático con ESLint (evidencias/lint-inicial.txt) |

## 2. Escala de severidad

| Severidad | Criterio |
|-----------|----------|
| Alta | Puede producir un resultado incorrecto para el cliente. |
| Media | Aumenta el riesgo de errores al modificar el código. |
| Baja | Problema de estilo o mantenimiento. |

## 3. Hallazgos

| ID | Origen | Severidad | Hallazgo | Evidencia | Acción propuesta | Estado |
|----|--------|-----------|----------|-----------|------------------|--------|
| H-01 | ESLint | Baja | Se usa var en lugar de let o const (2 veces). | lint-inicial.txt, líneas 2:3 y 5:3, regla no-var | Cambiar a let y const. | Corregido en la rama fix/hallazgos-eslint |
| H-02 | ESLint | Media | Se compara con == en la condición del VIP. | lint-inicial.txt, línea 3:13, regla eqeqeq | Cambiar a === (coincide con RF-02). | Corregido en la rama fix/hallazgos-eslint |
| H-03 | ESLint | Media | Los dos if no tienen llaves. | lint-inicial.txt, líneas 3:22 y 4:25, regla curly | Agregar llaves. | Corregido en la rama fix/hallazgos-eslint |
| H-04 | ESLint | Baja | Hay un console.log dentro de la lógica. | lint-inicial.txt, línea 4:25, regla no-console | Definir cómo manejar el error antes de quitarlo (depende de S-04). | Abierto, pendiente de confirmar |
| H-05 | Revisión humana | Alta | El valor 10 que se suma al VIP es impreciso: puede ser dinero o porcentaje. | Línea 3 del código, P-05 de la matriz, supuesto S-02 | Consultar S-02 antes de cambiarlo. | Abierto, pendiente de confirmar |
| H-06 | Revisión humana | Alta | Con porcentaje mayor a 100 solo se imprime un mensaje y el cálculo sigue, por lo que el total puede salir negativo. | Línea 4 del código, checklist ítems 7 y 11, P-06 | Detener el cálculo o limitar el valor, según S-04. | Abierto, pendiente de confirmar |
| H-07 | Revisión humana | Media | No se valida que precio y porcentaje sean números válidos ni que no sean negativos. | Checklist ítem 6 | Agregar validación de entrada. | Abierto, pendiente de confirmar |
| H-08 | Revisión humana | Media | El total no se redondea a 2 decimales. | RF-04, supuesto S-05 | Redondear el resultado una vez confirmado S-05. | Abierto, pendiente de confirmar |

## 4. Resumen

| Origen | Cantidad |
|--------|----------|
| ESLint | 4 |
| Revisión humana | 4 |
| Total | 8 |

Los hallazgos H-05 a H-08 no fueron detectados por ESLint, porque dependen de reglas de negocio y no de la forma del código.

## 5. Observaciones del revisor
La inspección se hizo en dos momentos. Primero, como autor, se leyó el código para recordar qué intención tenía cada línea. Después, con el rol de revisor, se volvió a leer aplicando el checklist y la salida de ESLint, sin dar por hecha la intención del autor.

**Observaciones del revisor:**

- En la línea 4 el código parece validar el porcentaje, porque tiene un `if (porcentaje > 100)`. Desde la lectura del autor eso se ve como un control. Al revisarlo con el checklist (ítems 7 y 11) se vio que solo imprime un mensaje y el cálculo sigue, así que el total puede salir negativo (H-06). ESLint solo marcó el `console.log`, no el fallo de lógica.
- El `+ 10` de la línea 3 se leyó al inicio como "un bono VIP". El revisor lo cuestionó: no se sabe si son 10 dólares o 10 % (H-05), y el requisito R-02 no lo aclara.

**Reparto de hallazgos:** ESLint detectó 4 de los 8 y la revisión humana los otros 4. Los más graves (severidad alta) fueron los de revisión humana.

**Limitación de esta inspección:** al ser un solo estudiante en los tres roles, el revisor comparte el mismo conocimiento del autor y puede pasar por alto defectos que un compañero con otra mirada sí vería.

## 6. Decisiones

| ID | Decisión | Hallazgos | Justificación | Estado |
|----|----------|-----------|---------------|--------|
| D-01 | Corregir ahora. | H-01, H-02, H-03 | Son reglas de ESLint confirmadas y la corrección no cambia el comportamiento del negocio, salvo el caso de esVip con valores no booleanos. | Aplicado |
| D-02 | No eliminar el console.log por ahora. | H-04 | Su tratamiento depende de cómo se resuelva H-06 | Pendiente de confirmar |
| D-03 | No modificar el valor 10 del VIP. | H-05 | Depende del supuesto S-02 (porcentaje o monto fijo). | Pendiente de confirmar |
| D-04 | No cambiar el manejo de porcentajes mayores a 100. | H-06 | Depende del supuesto S-04 (limite en promociones). | Pendiente de confirmar |
| D-05 | Validación de entradas aplazada. | H-07 | Hay que definir antes qué debe hacer la función ante datos inválidos (lanzar error o devolver un valor). | Pendiente de confirmar |
| D-06 | Redondeo aplazado. | H-08 | Depende del supuesto S-05. | Pendiente de confirmar |

**Criterio de cierre de esta iteración:** después de aplicar D-01, ESLint no debe mostrar errores y se espera que quede solo la advertencia de no-console (H-04). El resultado real se guarda en evidencias/lint-final.txt y se compara con esta acta.

## 7. Resultado después de las correcciones

| Medida | Antes (lint-inicial.txt) | Después (lint-final.txt) |
|--------|--------------------------|--------------------------|
| Errores | 5 | [0] |
| Advertencias | 1 | [1] |
| Total de problemas | 6 | [1] |

**Qué queda abierto y por qué:** la advertencia de no-console (H-04) se mantiene a propósito, porque el console.log está ligado a H-06 y a S-04. Los hallazgos H-05 a H-08 no los detecta ESLint y siguen pendientes de confirmar con el negocio.

**Efecto funcional de H-02:** el cambio de == a === hace que un esVip con valor 1 (número) deje de contarse como VIP. Es coherente con RF-02, pero es un cambio de comportamiento que debe confirmarse con el negocio.