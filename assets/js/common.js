
$(document).ready(function() {
    var profile_tpl = $('#profile-tpl').html();
    $.each(profiles, function(idx, profile) {
        var html = $(profile_tpl).clone();

        html.find('.edit').text(profile.name);
        html.find('.desc').text(profile.desc);
        html.find('.btn').attr('data-idx', idx);
        if (profile.selected) {
            setProfileSelected(html);
        }
        html.appendTo('.profiles');
    });

    function setProfileSelected(profile) {
        profile.addClass('selected');
        profile.find('.del').prop('disabled', true);
    }

    $('.edit').on('click', function() {
        var idx = $(this).data('idx');
        console.log('edit', idx);
        // TODO: 编辑
    });

    $('.select').on('click', function() {
        var idx = $(this).data('idx');
        var profiles = $('.profiles .profile');
        // TODO: 选择
        profiles.each(function(i, profile) {
            profile = $(profile);
            profile.removeClass('selected');
            profile.find('.del').prop('disabled', false);
        });
        setProfileSelected(profiles.eq(idx));
    });

    $('#delModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var idx = button.data('idx');
        var name = button.siblings().first().text();
        var modal = $(this);
        modal.find('#btn-confirm').data('idx', idx);
        modal.find('#del-profile-name').text(name);
    });

    $('#delModal #btn-confirm').on('click', function() {
        var idx = $(this).data('idx');
        var profile = $('.profiles .profile').eq(idx);
        // TODO: 删除
        profile.fadeOut('fast', function() {
            profile.remove();
        });
        $('#delModal').modal('hide');
    });
});
