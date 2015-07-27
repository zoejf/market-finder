$(function() {
	console.log('testetset');
	$.get('/me', function (data) {
      if (data === 'no current user') {
        $('#current-user-greet').html('Hello, guest!');
      } else {
        $('#current-user-greet').html('Hello ' + data.email);
      }
    });

})