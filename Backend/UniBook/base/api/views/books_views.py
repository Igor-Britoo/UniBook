from django.db.models import Count, Max, Min

from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *
from ..utils import *

@api_view(['GET'])
def list_books(request):
    """
        Returns all books
    """
    limit = int(request.GET.get('limit'))
    offset = int(request.GET.get('offset'))

    books = Book.objects.all()

    number_of_pages = get_number_of_pages(books, limit)

    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_books_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : str(number_of_pages),
                        'books': books_serialized.data }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def list_books_with_filters(request):
    """
        Filter books by price interval, publication year interval, genres and languages
    """

    genres = request.GET.getlist('genre')
    languages = request.GET.getlist('language')
    price_interval = request.GET.get('price-interval')
    publication_year_interval = request.GET.get('publication-year-interval')
    limit = int(request.GET.get('limit'))
    offset = int(request.GET.get('offset'))

    books = Book.objects.all()

    # Filtering by price interval
    if price_interval:
        price_min, price_max = get_values_from_interval_slug(price_interval)

        if price_max is not None :
            books = books.filter(price__range = (price_min, price_max))
        else:
            books = books.filter(price__gte = price_min)  

    # Filtering by price publication year interval
    if publication_year_interval:
        publication_year_min, publication_year_max = get_values_from_interval_slug(publication_year_interval)

        if publication_year_max is not None:
            books = books.filter(publication_year__range = (publication_year_min, publication_year_max))
        else:
            books = books.filter(publication_year__gte = publication_year_min)

    # Filtering by languages
    there_is_languages = len(languages) > 0
    all_languages_selected = len(Book.Language.choices) == len(languages)
    
    if there_is_languages and not all_languages_selected:
        books = books.filter(language__in = languages)
    
    there_is_genres = len(genres) > 0
    all_genres_selected = Genre.objects.all().count() == len(genres)

    # Filtering by genres
    if there_is_genres and not all_genres_selected:
        for genre in genres:
            books = books.filter(genres = genre)  

    # Getting genres count
    genres = []
    for genre in Genre.objects.all():
        count = books.filter(genres = genre ).count()
        if count > 0:
            genres.append({ 'genre': genre.name, 'count': count })

    # Getting languages count
    languages = books.values('language').annotate(count=Count('language')).values('language', 'count').filter(count__gt=0)

    # Getting price and publication year ranges
    price_range = books.aggregate(min=Min('price'), max=Max('price'))
    publication_year_range = books.aggregate(min=Min('publication_year'), max=Max('publication_year'))

    # Getting the required page
    number_of_pages = get_number_of_pages(books, limit)
    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_books_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : str(number_of_pages),
                        'books': books_serialized.data,
                        'filters': {
                            'genres': genres,
                            'languages': languages,
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
def search_books(request):
    """
        Search books by ISBN, title and author
    """
    
    query = request.GET.get('q')
    limit = int(request.GET.get('limit'))
    offset = int(request.GET.get('offset'))
    
    books_filtered_by_ISBN = Book.objects.filter(ISBN__startswith = query)
    books_filtered_by_title = Book.objects.filter(title__icontains = query)
    books_filtered_by_author = Book.objects.filter(author__icontains = query)

    books = books_filtered_by_ISBN.union(books_filtered_by_title, books_filtered_by_author)
    
    number_of_pages = get_number_of_pages(books, limit)

    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_books_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : str(number_of_pages),
                        'books': books_serialized.data }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def most_viewed_books(request):
    """
        Returns the most viewed books
    """
    limit = int(request.GET.get('limit'))
    offset = int(request.GET.get('offset'))

    books = Book.objects.all().order_by('-views')
    
    number_of_pages = get_number_of_pages(books, limit)

    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_books_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : str(number_of_pages),
                        'books': books_serialized.data }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)


@api_view(['GET'])
def best_sellers(request):
    """
        Returns a list with the best sellers
    """
    limit = int(request.GET.get('limit'))
    offset = int(request.GET.get('offset'))

    books = Book.objects.all().order_by('-sellings')
    
    number_of_pages = get_number_of_pages(books, limit)

    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_books_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : str(number_of_pages),
                        'books': books_serialized.data }, status=200)
    else:
        return Response({ "detail": "Page not found" }, status=404)

@api_view(['GET'])
def books_on_sale(request):
    """
        Returns the most viewed books
    """
    limit = int(request.GET.get('limit'))
    offset = int(request.GET.get('offset'))

    books = Book.objects.all().order_by('-discount')

    number_of_pages = get_number_of_pages(books, limit)

    page = (offset/limit) + 1
    page_exists =  page > 0 and page <= number_of_pages

    if page_exists:
        books_page = get_books_page(offset, limit, books)
        books_serialized = BookSerializer(books_page, many=True)

        return Response({ 'number_of_pages' : str(number_of_pages),
                        'books': books_serialized.data }, status=200)
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