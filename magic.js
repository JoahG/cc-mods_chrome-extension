var do_the_magic = function(){
    var b = function(m, s, e){
        $.ajax({
            url: 'http://www.codecademy.com/admin/forums/'+m+'_user?user_identifier='+CCDATA.user._id,
            type: "POST",
            data: {
                _method: 'put',
                authenticity_token: CCDATA.authenticity_token
            },
            beforeSend: function (e) {
                e.setRequestHeader("X-CSRF-Token",csrf_token);
                e.setRequestHeader("X-Requested-With","XMLHttpRequest");
                e.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.0");
            },
            success: function (d) {
                s(d);
            },
            error: function(d) {
                e(d)
            }
        })
    }
    var errorlog = function(d) {console.log(d);alert('An error occurred, check your JS console.');}
    if (CCDATA.rebrand) {
        $('article.fit-full article.fit-fixed div.grid-row div.grid-col-6').find('form').css('display', 'inline-block')
        $('article.fit-full article.fit-fixed div.grid-row div.grid-col-6').append('<button class="button button--alternate ext-ban-user" id="" style="margin:0 5px;width: 137px;display:none;">Ban User</button><button class="button button--alternate ext-unban-user" id="" style="margin:0 5px;width: 137px;display:none;">Unban User</button>');
        $.getJSON('/api/v1/users'+window.location.pathname, function(d) {CCDATA.user = d}).done(function(){
            b('ban', function(d){
                b('unban', function(d){
                    CCDATA.user.banned = false;
                    $('.ext-ban-user').show();
                }, function(d){
                    errorlog(d);
                });
            }, function(){
                CCDATA.user.banned = true;
                $('.ext-unban-user').show();
            });

            $('.ext-ban-user').click(function(){
                b('ban', function(d){alert('User has been banned.');$('.ext-ban-user').hide();$('.ext-unban-user').show();}, function(d){errorlog(d);});
            });
            $('.ext-unban-user').click(function(){
                b('unban', function(d){alert('User has been unbanned.');$('.ext-unban-user').hide();$('.ext-ban-user').show();}, function(d){errorlog(d);});
            })
        });
    }
}

var script = document.createElement("script");
script.textContent = "(" + do_the_magic.toString() + "())";
document.documentElement.appendChild(script);