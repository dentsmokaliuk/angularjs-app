function activateTab() {
    $(function() {

        $('ul.tabs__caption li:nth-child(1), div.tabs__content:nth-of-type(1)').addClass('active').siblings().removeClass('active');

        $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });

        $('.show').unbind().on("click", function () {
            $('.'+ $(this).data('tab')).toggleClass('tabs__hide');
        });
    });
};
