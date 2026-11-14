# Requisitos del módulo de descuentos
Fase A. Revisión de los requisitos originales (R-01 a R-04)

## 1. Problemas de los requisitos originales

| ID | REQUISITOS ORIGINALES | PROBLEMAS DETECTADOS |
|----|-----------------------|----------------------|
| R-01 | El descuento debe calcularse rápidamente | Rápidamente no tiene unidad ni umbral, por lo que no se sabe si se cumple |
| R-02 | Los clientes importantes obtendrán un descuento especial | No se define quién es un cliente importante ni qué es un descuento especial |
| R-03 | El descuento no puede superar el precio, excepto en promociones | No se define qué es una promoción ni el límite de cuánto puede superar el precio en ese caso |
| R-04 | Se debe mostrar el resultado correcto | No se ha definido una fórmula, el redondeo ni el formato del resultado |

## 2. Requisitos funcionales verificables

| ID | REQUISITO MEJORADO | CÓMO SE VERIFICA |
|----|--------------------|------------------|
| RF-01 | El cálculo de un descuento debe completarse en menos de 100 ms en el 95 % de 1000 ejecuciones consecutivas (umbral por confirmar, ver S-01). | Medir el tiempo de 1000 llamadas seguidas y calcular el percentil 95. |
| RF-02 | Si el cliente es VIP (esVip === true), se aplica un descuento adicional de X % sobre el precio. El valor de X y la definición de VIP quedan por confirmar (S-02 y S-03). | Probar el mismo precio con cliente VIP y no VIP y comparar los totales. |
| RF-03 | El descuento total no puede ser mayor que el precio. Solo si hay una promoción activa se permite superarlo, hasta el tope definido en S-04. | Casos límite: porcentaje 100 y 101, con y sin promoción. |
| RF-04 | El total es precio menos descuento, redondeado a 2 decimales, y no puede ser negativo salvo lo permitido en RF-03. | Comparar el resultado con ejemplos calculados a mano. |

## 3. Supuestos de negocio pendientes de confirmación

| ID | SUPUESTO | QUIÉN CONFIRMA | ESTADO |
|----|----------|----------------|--------|
| S-01 | El tiempo máximo aceptable es de 100 ms. | Dueño del producto | Pendiente |
| S-02 | El +10 del cliente VIP es un porcentaje adicional y no un monto fijo en dinero. | Dueño del producto | Pendiente |
| S-03 | Cliente importante equivale a esVip === true. | Área comercial | Pendiente |
| S-04 | En una promoción el descuento puede llegar como máximo al 100 % del precio. | Área comercial | Pendiente |
| S-05 | El total se redondea a 2 decimales. | Dueño del producto | Pendiente |
| S-06 | El descuento VIP se acumula con el porcentaje normal. | Área comercial | Pendiente |

## 4. Matriz de problemas y trazabilidad

| ID | PROBLEMA | IMPACTO | PROPUESTA | ARTEFACTO | ESTADO |
|----|----------|---------|-----------|-----------|--------|
| P-01 | R-01 no tiene un umbral de tiempo | No se puede verificar el rendimiento | RF-01 con 100 ms en el percentil 95 | docs/requisitos.md | Propuesto |
| P-02 | R-02 no define importante ni especial | Cada desarrollador lo implementa a su manera | RF-02 con VIP y un X % (S-02, S-03) | docs/requisitos.md | Pendiente de confirmar |
| P-03 | R-03 no define promoción ni el límite | Pueden salir totales negativos | RF-03 con promoción y límite (S-04) | docs/requisitos.md | Pendiente de confirmar |
| P-04 | R-04 no define correcto | Resultados con varios decimales | RF-04 con fórmula y redondeo a 2 decimales | docs/requisitos.md | Propuesto |
| P-05 | El código suma un 10 fijo al cliente VIP | No se sabe si son 10 dólares o 10 % | Confirmar S-02 antes de cambiarlo | src/descuentos.js | Pendiente de confirmar |
| P-06 | Con porcentaje mayor a 100 solo se imprime un mensaje | El cálculo continúa y el total sale negativo | Detener el cálculo o limitar el valor, según S-04 | src/descuentos.js | Pendiente de confirmar |