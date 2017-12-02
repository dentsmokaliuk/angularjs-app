authorsApp.controller("authorsCtrl", function($scope, $filter, authorsAppService) {

    $scope.authors = [];
    $scope.books = [];
    $scope.book = {};
    $scope.urlAuthors = 'authors/';
    $scope.urlBooks = 'books/';
    $scope.idOfCurrentAuthor = "";
    $scope.view = "main";

    $scope.loadData = function () {
        authorsAppService.getAll($scope.urlAuthors).success(function (response) {
            $scope.authors = response;
        });
        authorsAppService.getAll($scope.urlBooks).success(function (response) {
            $scope.books = response;
            activateTab();
        });
    };

    $scope.createAuthor = function () {
        authorsAppService.create($scope.urlAuthors, $scope.author).success(function (response) {
            $scope.authors.push(response);
            activateTab();
            $scope.view = "main";
        });
    };

    $scope.updateAuthor = function () {
        authorsAppService.update($scope.urlAuthors, $scope.author);
        activateTab();
        $scope.view = "main";
    };

    $scope.deleteAuthor = function (author) {
        authorsAppService.delete($scope.urlAuthors, author).success(function () {
            $scope.authors.splice($scope.authors.indexOf(author), 1);
        });
        $scope.view = "main";
    };

    $scope.editOrCreateAuthor = function (author) {
        if (author) {
            $scope.author = author;
            $scope.view = 'edit';
        } else {
            $scope.author= {};
            $scope.view = 'add';
        }
    };

    $scope.editOrCreateBook = function (author, book) {
        $scope.book = book ? book : {};
        $scope.idOfCurrentAuthor = author.id;
        $scope.view = 'books-edit';
    };

    $scope.saveBook = function (book) {
        if (angular.isDefined(book.id)) {
            authorsAppService.update($scope.urlBooks, book);
        } else {
            authorsAppService.create($scope.urlBooks, {
                title: book.title,
                genre: book.genre,
                pages: book.pages,
                authorId: $scope.idOfCurrentAuthor
            }).success(function (response) {
                $scope.books.push(response);
                activateTab();
            });
        }
        $scope.view = "main";
    };

    $scope.deleteBook = function (book) {
        authorsAppService.delete($scope.urlBooks, book).success(function () {
            $scope.books.splice($scope.books.indexOf(book), 1);
        });
        activateTab();
    };

    $scope.cancelEdit = function () {
        $scope.author = {};
        $scope.book = {};
        $scope.view = "main";
    };

    $scope.findBook = function(title) {
        $scope.exsist = false;

        var found = $filter('filter')($scope.books, {'title': title}, true);

        if (found[0]) {
            authorsAppService.search(found[0].id);
            $scope.exsist = true;
        }
    };

    $scope.loadData();
});