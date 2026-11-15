# Auditoría estática del módulo de descuentos
Actividad de la Unidad 1 de Verificación y Validación de Software.
El proyecto revisa un módulo JavaScript de descuentos sin ejecutarlo, primero se mejoran los requisitos, luego se aplica análisis estático con ESLint y una inspección por pares, y al final se corrigen solo los hallazgos confirmados.

## Estructura
| Carpeta o archivo | Contenido |
|-------------------|-----------|
| src/descuentos.js | Módulo de descuentos a inspeccionar |
| docs/requisitos.md | Requisitos originales, requisitos verificables, supuestos y matriz de problemas |
| docs/checklist.md | Checklist de revisión de 12 preguntas |
| docs/acta-inspeccion.md | Acta de la inspección por pares con los hallazgos |
| evidencias/lint-inicial.txt | Salida de ESLint antes de corregir |
| evidencias/lint-final.txt | Salida de ESLint después de corregir |
| eslint.config.js | Configuración de reglas |

## Cómo reproducir el análisis
Se necesita Node.js instalado.

```bash
npm install
npm run lint
```

## Reglas de ESLint usadas
| Regla | Para qué sirve |
|-------|----------------|
| no-var | Evita var, que tiene alcance de función y permite redeclarar sin aviso. |
| eqeqeq | Obliga a usar ===, para no depender de conversiones de tipo. |
| curly | Obliga a usar llaves en los if, para evitar errores al agregar líneas. |
| no-unused-vars | Avisa de variables declaradas que no se usan. |
| no-console | Avisa de console.log dentro de la lógica del módulo. |

## Resultado
| Medida | Antes | Después |
|--------|-------|---------|
| Errores | 5 | 0 |
| Advertencias | 1 | 1 |
| Total de problemas | 6 | 1 |

Se corrigieron los hallazgos H-01, H-02 y H-03 (reglas confirmadas de ESLint). La advertencia de no-console se mantiene a propósito porque depende de cómo se defina el manejo de porcentajes mayores a 100.

## Pendiente de confirmar
Los hallazgos H-04 a H-08 no se modificaron porque dependen de decisiones de negocio (supuestos S-02, S-04 y S-05 de docs/requisitos.md). ESLint no puede detectar varios de ellos, como el valor fijo de 10 para clientes VIP o la falta de validación de entradas.

## Autor
15/11/2026, Jaime Carvajal. Verificación y Validación de Software, Unidad 1.