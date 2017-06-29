$(document).ready(function(){

//definição de variáveis globais
var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbAlunos = localStorage.getItem("tbAlunos");// Recupera os dados armazenados    
tbAlunos = JSON.parse(tbAlunos); // Converte string para objeto
if(tbAlunos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
tbAlunos = [];

//função Adicionar
function Adicionar(){
    var cliente = JSON.stringify({
        idAluno   : $("#txtID").val(),
        Nome     : $("#txtNome").val(),
    });
    tbAlunos.push(cliente);
    localStorage.setItem("tbAlunos", JSON.stringify(tbAlunos));
    alert("Aluno(a) inserido com sucesso!");
    return true;
}

//função Editar
function Editar(){
    tbAlunos[indice_selecionado] = JSON.stringify({
            idAluno   : $("#txtID").val(),
            Nome     : $("#txtNome").val(),
        });//Altera o item selecionado na tabela
    localStorage.setItem("tbAlunos", JSON.stringify(tbAlunos));
    alert("Registro alterado com sucesso!");
    operacao = "A"; //Volta ao padrão
    return true;
}

//função Excluir
function Excluir(){
    tbAlunos.splice(indice_selecionado, 1);
    localStorage.setItem("tbAlunos", JSON.stringify(tbAlunos));
    alert("Registro excluído.");
}

//função Listar
function Listar(){
    $("#tblListar").html("");
    $("#tblListar").html(
        "<thead>"+
        "   <tr>"+
        "   <th></th>"+
        "   <th></th>"+
        "   <th>ID do Aluno</th>"+
        "   <th>Nome do Aluno</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var i in tbAlunos){
        var alu= JSON.parse(tbAlunos[i]);
        $("#tblListar tbody").append("<tr><th scope='row' class='col-xs-1'><button type='button' class='btn btn-primary btnEditar' alt='"+i+"'>Editar</button><th scope='row' class='col-xs-1'><button type='button' class='btn btn-danger btnExcluir' alt='"+i+"'>Excluir</button><td class='col-xs-5'>"+alu.idAluno+"</td><td class='col-xs-5'>"+alu.Nome+"</td></tr>");
    }
}

//evento onSubmit do form
$("#frmCadastro").on("submit",function(){
    if(operacao == "A")
        return Adicionar();
    else
        return Editar();       
});

//evento onClick dos botões Editar
$("#tblListar").on("click", ".btnEditar", function(){
    operacao = "E";
    indice_selecionado = parseInt($(this).attr("alt"));
    var alu= JSON.parse(tbAlunos[indice_selecionado]);
    $("#txtID").val(alu.idAluno);
    $("#txtNome").val(alu.Nome);
$("#txtID").attr("readonly","readonly");
    $("#txtNome").focus();
});

//evento onClick dos botões Excluir
$("#tblListar").on("click", ".btnExcluir",function(){
    indice_selecionado = parseInt($(this).attr("alt"));
    Excluir();
    Listar();
});

Listar();

}); //Fim do (document).ready
