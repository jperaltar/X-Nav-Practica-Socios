function addMessages(messages, id) {
  for (var i = 0; i < messages.length; i++) {
    parag = $(document.createElement("p"));
    parag.append("<h4>" + messages[i].title + "</h4>");
    parag.append("<p>" + messages[i].content + "</p>");
    parag.append("<span><img width=40px height=40px src=/css/images/" + messages[i].avatar + ">"
      + messages[i].author + " on " + messages[i].date + "</span>");
    $(id).prepend(parag);
  }
}

$(document).ready(function() {
  $("#tabs").tabs();

  $.ajaxSetup({cache: false})
  $.ajax({
    url: "./json/myline.json"
  })
    .done(function (data) {
      addMessages(data.messages, "#myline");
    })
    .fail(function (err) {
      console.log("Fail loading myline.json");
    });

  $.ajax({
    url: "./json/timeline.json"
  })
    .done(function (data) {
      addMessages(data.messages, "#timeline");
    })
    .fail(function (err) {
      console.log("Fail loading timeline.json");
    });

  $.ajax({
    url: "./json/update.json"
  })
    .done(function (data) {
      console.log("Update");
      if (data.messages.length !== 0) {
        console.log("Debug");
        a = document.createElement("a");
        a.innerHTML = "Tienes " + data.messages.length + "mensaje(s) nuevo(s).";
        a.id = "update";
        $("#tab-2").append(a);
        $("#update").on("click", function(event) {
          addMessages(data.messages, "#timeline");
          $("#update").remove();
        })
      }
    })
    .fail(function (err) {
      console.log("Fail loading update.json");
    });
});
