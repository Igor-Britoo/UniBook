from django.db.models import Count, Max, Min, Q

from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *
from ..utils import *

@api_view(['GET'])
def list_books(request):
    """
        Returns all books and their possible filters
    """

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    books = Book.objects.all()

    number_of_pages = get_number_of_pages(books, limit)

    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    # Getting languages count
    languages_count = books.values('language').annotate(count=Count('language')).values('language', 'count').filter(count__gt=0)

    # Getting genres count
    genres_count = []
    for genre in Genre.objects.all():
        count = books.filter(genres = genre).count()
        if count > 0:
            genres_count.append({ 'genre': genre.name, 'count': count })

    # Getting price and publication year ranges
    price_range = books.aggregate(min=Min('price'), max=Max('price'))
    publication_year_range = books.aggregate(min=Min('publication_year'), max=Max('publication_year'))

    if page_exists:
        books_page = get_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : number_of_pages,
                        'books': books_serialized.data,
                        'filters': {
                            'genres': genres_count,
                            'languages': languages_count,
                            'price': {
                                'min': price_range['min'],
                                'max': price_range['max']
                            },
                            'publication_year':{
                                'min': publication_year_range['min'],
                                'max': publication_year_range['max']
                            }
                        }}, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)    

@api_view(['GET'])
def list_books_with_filters(request):
    """
        Filter books by price interval, publication year interval, genres and languages and, returns
        a list of books and their possible filters
    """

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    books = Book.objects.all()
    
    books, filters = filter_books(request, books)

    # Getting the required page
    number_of_pages = get_number_of_pages(books, limit)
    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : number_of_pages,
                        'books': books_serialized.data,
                        'filters': filters
                        }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def search_books(request):
    """
        Search books by ISBN, title and author and, returns the found books and their possible filters.
        If the query parameters has genres, languages, price interval or publication year interval, filters
        the found books.
    """

    query = request.GET.get('q')
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    if not query:
        return Response({ 'detail' : 'Cannot search without a query' }, status=400)

    else:
        queries = Q(ISBN__startswith = query) | Q(title__icontains = query) | Q(author__icontains = query)
        books = Book.objects.filter(queries)

        found_nothing = len(books) == 0

        if found_nothing:
            return Response({ 'detail' : 'Could not find anything for "' + query + '"' }, status=404)
        
        else:
            books, filters = filter_books(request, books)

            number_of_pages = get_number_of_pages(books, limit)

            page = (offset/limit) + 1
            page_exists =  page > 0 and page <= number_of_pages

            if page_exists:
                books_page = get_page(offset, limit, books)
                books_serialized = BookSerializer(books_page, many=True)

                return Response({ 'number_of_pages' : number_of_pages,
                                'books': books_serialized.data,
                                'filters': filters
                                }, status=200)
            else:
                return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def most_viewed_books(request):
    """
        Returns the most viewed books and their possible filters. If the query parameters has genres,
        languages, price interval or publication year interval, filters the sorted books.
    """

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    books = Book.objects.all().order_by('-views')
    
    books, filters = filter_books(request, books)

    # Getting the required page
    number_of_pages = get_number_of_pages(books, limit)
    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : number_of_pages,
                        'books': books_serialized.data,
                        'filters': filters
                        }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def best_sellers(request):
    """
        Returns a list with the best sellers and their possible filters. If the query parameters has genres,
        languages, price interval or publication year interval, filters the sorted books.
    """

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    books = Book.objects.all().order_by('-sellings')
    
    books, filters = filter_books(request, books)

    # Getting the required page
    number_of_pages = get_number_of_pages(books, limit)
    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : number_of_pages,
                        'books': books_serialized.data,
                        'filters': filters
                        }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def books_on_sale(request):
    """
        Returns the most viewed books and their possible filters. If the query parameters has genres,
        languages, price interval or publication year interval, filters the sorted books.
    """

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    books = Book.objects.all().order_by('-discount')

    books, filters = filter_books(request, books)

    # Getting the required page
    number_of_pages = get_number_of_pages(books, limit)
    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : number_of_pages,
                        'books': books_serialized.data,
                        'filters': filters
                        }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def get_book(request, ISBN):
    """
        If it exists, returns the book with the specified ISBN
    """

    book = Book.objects.filter(ISBN = ISBN)

    if book.exists() :
        book = book.first()
        book.views = book.views + 1
        book.save()
        book_serialized = BookSerializer(book)

        return Response({ 'book': {
            **book_serialized.data,
            "language" : Book.Language[str(book.language.upper()).replace('-', '_')].label
        } }, status=200)

    else:
        return Response({ "detail": "Book not found" }, status=404)