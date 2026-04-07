# System Patterns

## Architecture
- **Framework**: React 18 с Vite
- **Language**: TypeScript
- **Styling**: CSS Modules

## Components
- GameField — основной компонент игрового поля
- Player — компонент игрока
- Ball — компонент мяча
- ScenarioSelector — переключатель тактических сценариев

## Data Flow
- Локальное состояние через useState/useReducer
- Позиции игроков хранятся как массив координат

## State Management
- useState для простых состояний
- useReducer для игровой логики (опционально)
