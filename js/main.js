(function ($) {
    "use strict";

    // Skills section
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });
    
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      });
      
      
    
})(jQuery);

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // ID du formulaire Google pour chaque champ (trouvez-les dans l'URL de pré-remplissage)
    var googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfm4xdAsrzwlcyBbrVGk0XL8K3i3fxgmvbeaw8tw99uUvfAVg/formResponse"; // Remplacez par votre URL de formulaire

    // Correspondance des noms des champs avec ceux du formulaire Google
    var formData = new FormData();
    formData.append("entry.677524296", document.getElementById("name").value); // Remplacez avec l'ID réel
    formData.append("entry.1710576459", document.getElementById("email").value); // Remplacez avec l'ID réel
    formData.append("entry.1810006384", document.getElementById("subject").value); // Remplacez avec l'ID réel
    formData.append("entry.1297069348", document.getElementById("message").value); // Remplacez avec l'ID réel
    formData.append("submit", "Submit"); // Remplacez avec l'ID réel

    var q = new URLSearchParams(formData).toString()
    // Envoyer la requête POST à Google Forms
    fetch(`${googleFormURL}?${q}`, {
        mode: 'no-cors',
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.error("Error!", error.message);
        alert("Failed to send the message. Please try again.");
    });
});

