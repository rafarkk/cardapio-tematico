# Cardápio Temático

Cardápio animado com três "skins": **Bruxo**, **Medieval** e **Futurista**. Os itens ficam em prateleiras separadas por categoria; ao tocar num item ele vem para a frente com a ficha, e ao adicionar ele voa para o receptáculo do tema (caldeirão, baú ou teleportador). Dali dá para revisar, esvaziar e fechar o pedido.

## Rodar

É um site estático (HTML, CSS e JavaScript puro), sem build e sem Node. Só precisa ser servido por qualquer servidor web, porque o navegador não carrega módulos JavaScript abrindo o arquivo direto (`file://`):

- extensão **Live Server** do VS Code, ou
- `python -m http.server` na pasta do projeto (abre em http://localhost:8000), ou
- IIS, Apache, Nginx, qualquer hospedagem estática.

Para trocar de tema, use o botão de paleta no canto inferior esquerdo (ferramenta de teste) ou a URL: `?tema=bruxo`, `?tema=medieval`, `?tema=futurista`.

## Produtos

O cardápio começa vazio e é montado importando um JSON: botão **Importar** no topo (colar o texto ou arrastar o arquivo), substituindo ou adicionando ao que já existe. O arquivo `produtos-exemplo.json` serve de modelo e para testes. Os produtos ficam salvos no `localStorage` do navegador.

Formato: uma lista, ou um objeto `{ "produtos": [...] }`:

```json
{
  "produtos": [
    {
      "categoria": "Lanches",
      "nome": "X-Salada",
      "descricao": "Pão brioche, hambúrguer 150 g, queijo, alface e tomate.",
      "preco": 26.9,
      "tipo": "hamburguer"
    }
  ]
}
```

- `preco` aceita número (`26.9`) ou texto (`"26,90"`).
- `tipo` define o ícone e o nome temático em cada tema (ex.: um `hamburguer` aparece como "Hambúrguer Alado" no tema bruxo; itens do mesmo tipo recebem apelidos diferentes). A lista completa está em `src/tipos.js` e no próprio importador (seção "Tipos de item aceitos"). Acentos, maiúsculas, `"suco de laranja"` no lugar de `suco_laranja` e vários sinônimos são aceitos (`"refri"`, `"chope"`, `"burrito"`, `"temaki"`, `"brownie"`, `"salada de frutas"`...). Tipo desconhecido vira um ícone genérico, com aviso.
- As categorias viram prateleiras, na ordem em que aparecem no JSON.

## Estrutura

| Arquivo | O que tem |
| --- | --- |
| `src/tipos.js` | Os 69 tipos de item (grupo, formato, cor do líquido) e sinônimos |
| `src/apelidos.js` | Nomes temáticos de cada tipo, por tema |
| `src/loja.js` | Estado: produtos, carrinho, tema, validação da importação, pedidos |
| `produtos-exemplo.json` | Cardápio de exemplo para importar |
| `src/temas.js` | Configuração de cada tema: textos, receptáculo, decoração, partículas |
| `src/icones/base.js` | Desenhos SVG das comidas/sobremesas, reaproveitados pelos temas |
| `src/icones/{bruxo,medieval,futurista}.js` | Ícones próprios de cada tema + nomes temáticos ("Asa de Dragão") |
| `src/ui/*` | Prateleiras, ficha, carrinho/pedido, importador |
| `src/efeitos.js` / `src/sons.js` | Partículas, voo dos itens e sons sintetizados (Web Audio) |
| `src/estilos/*` | CSS base + um arquivo por tema |

Todos os ícones são SVG desenhados em código (sem imagens externas); as animações internas usam as classes `fx-*` de `src/estilos/animacoes.css`.

### Criar um tema novo

1. Crie `src/icones/meutema.js` exportando `iconeMeutema(tipo, info)` e adicione os apelidos do tema em `src/apelidos.js`.
2. Adicione a entrada em `TEMAS` (`src/temas.js`) com textos, SVG do receptáculo, `boca` (ponto onde os itens caem, em fração do SVG), decoração e partículas.
3. Crie `src/estilos/meutema.css` com as variáveis sob `[data-tema='meutema']` e adicione o `<link>` no `index.html`.
4. Se quiser sons próprios, adicione um perfil em `src/sons.js`.
