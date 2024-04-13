$(document).ready(function() {
    // Obtener usuarios desde JSONPlaceholder
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET',
      dataType: 'json',
      success: function(users) {
        // Llenar la tabla con los usuarios
        populateTable(users);
      }
    });
  
    // Función para llenar la tabla con los usuarios
    function populateTable(users) {
      var tableBody = $('#userTable tbody');
      $.each(users, function(index, user) {
        var row = $('<tr>');
        row.append($('<td>').text(user.name));
        row.append($('<td>').text(user.email));
        // Agregar extensión al número de teléfono si está disponible
        var phoneText = user.phone;
        var extensionIndex = user.phone.indexOf('x');
        if (extensionIndex !== -1) {
          phoneText = phoneText.substring(0, extensionIndex) + ' Ext: ' + phoneText.substring(extensionIndex + 1);
        }
        row.append($('<td>').text(phoneText));
        row.append($('<td>').text(user.company.name));
        // Dividir la dirección en calle, suite, ciudad, código postal y ubicación geográfica
        var address = user.address;
        var addressText = address.street + ', ' + address.suite + ', ' + address.city + ', ' + address.zipcode + ', ' + 'Lat: ' + address.geo.lat + ', Lon: ' + address.geo.lng;
        row.append($('<td>').text(addressText));
        tableBody.append(row);
      });
    }
  
    // Filtrar usuarios según el input
    $('#filterInput').on('input', function() {
      var filterValue = $(this).val().toLowerCase();
      $('#userTable tbody tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(filterValue) > -1);
      });
    });
  });
  