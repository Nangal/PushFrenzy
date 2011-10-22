(function() {
  game.input = (function($, game) {
    var bindKeyboardControls, bindTouchControls, input, move, updatePlayEnabled;
    updatePlayEnabled = function() {
      if ($('#namebox').val().length === 0) {
        return $('#playbutton').attr('disabled', 'disabled');
      } else {
        return $('#playbutton').removeAttr('disabled');
      }
    };
    bindKeyboardControls = function(connection) {
      var direction, key, keys, moveKeyMap, _fn, _i, _len;
      moveKeyMap = {
        Down: ['down', 's'],
        Up: ['up', 'w'],
        Left: ['left', 'a'],
        Right: ['right', 'd']
      };
      for (direction in moveKeyMap) {
        keys = moveKeyMap[direction];
        _fn = function(direction, key) {
          return $(document).bind('keydown', key, function() {
            return move(connection, direction);
          });
        };
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          _fn(direction, key);
        }
      }
      return null;
    };
    bindTouchControls = function(connection) {
      var interval;
      interval = {};
      $('#arrorImg').bind('dragstart', function(event) {
        return event.preventDefault();
      });
      return $('#arrowMap area').click(function(event) {
        return event.preventDefault();
      }).mousedown(function(event) {
        var moveFn;
        moveFn = function() {
          return move(connection, $(event.target).attr('alt'));
        };
        moveFn();
        if (interval) {
          clearInterval(interval);
        }
        interval = setInterval(moveFn, 200);
        return event.preventDefault();
      }).bind('mouseup mouseleave', function() {
        return clearInterval(interval);
      });
    };
    move = function(connection, direction) {
      return connection.game.move(direction);
    };
    return input = {
      prepareNameBox: function() {
        updatePlayEnabled();
        return $('#namebox').keyup(updatePlayEnabled).focus();
      },
      bindControls: function(connection) {
        bindTouchControls(connection);
        return bindKeyboardControls(connection);
      }
    };
  })(jQuery, game);
}).call(this);
