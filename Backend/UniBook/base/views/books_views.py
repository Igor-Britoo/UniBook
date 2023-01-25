from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import *
from ..serializers import *

@api_view(['GET'])
def list_books(request):
    """
        Returns all books
    """
    if request.method == 'GET':
        books = Book.objects.all()
        books_serialized = BookSerializer(books, many=True)

        return Response({'books': books_serialized.data}, status=200)

    return Response(status=400)

@api_view(['GET'])
def list_books_with_filters(request):
    """
        Filter books by price interval, publication year interval, genres and languages
    """
    def get_values_from_interval_slug(interval_slug):
        for i in range(0, len(interval_slug)):
            if (interval_slug[i] == "-"):
                min = int(interval_slug[:i])
                there_is_max = len(interval_slug) >  i+1

                if there_is_max:
                    max = int(interval_slug[i+1:])
                else:
                    max = None

        return (min, max)

    if request.method == 'GET':
        genres = request.GET.getlist('genre')
        languages = request.GET.getlist('language')
        price_interval = request.GET.get('price-interval')
        publication_year_interval = request.GET.get('publication-year-interval')

        price_min, price_max = get_values_from_interval_slug(price_interval)
        publication_year_min, publication_year_max = get_values_from_interval_slug(publication_year_interval)
        
        books = Book.objects.all()

        there_is_languages = len(languages) > 0
        all_languages_selected = len(Book.Language.choices) == len(languages)
        
        if there_is_languages and not all_languages_selected:
            books = books.filter(language__in = languages)
        
        there_is_genres = len(genres) > 0
        all_genres_selected = Genre.objects.all().count() == len(genres)

        if there_is_genres and not all_genres_selected:
            for genre in genres:
                books = books.filter(genres = genre)

        if price_max is not None :
            books = books.filter(price__range = (price_min, price_max))
        else:
            books = books.filter(price__gte = price_min)    

        if publication_year_max is not None:
            books = books.filter(publication_year__range = (publication_year_min, publication_year_max))
        else:
            books = books.filter(publication_year__gte = publication_year_min)
        
        books_serialized = BookSerializer(books, many=True)

        return Response({'books': books_serialized.data}, status=200)
        
    return Response(status=400)

@api_view(['GET'])
def search_books(request):
    """
        Search books by ISBN, title and author
    """
    if request.method == 'GET':
        query = request.GET.get('q')
        
        books_filtered_by_ISBN = Book.objects.filter(ISBN__startswith = query)
        books_filtered_by_title = Book.objects.filter(title__icontains = query)
        books_filtered_by_author = Book.objects.filter(author__icontains = query)

        books = books_filtered_by_ISBN.union(books_filtered_by_title, books_filtered_by_author)
        books_serialized = BookSerializer(books, many=True)
    
        return Response({'books': books_serialized.data}, status=200)

    return Response(status=400)

@api_view(['GET'])
def get_book(request, ISBN):
    """
        If it exists, returns the book with the specified ISBN
    """
    if request.method == 'GET':
        book = Book.objects.filter(ISBN = ISBN)

        if book.exists() :
            book = book.first()
            book_serialized = BookSerializer(book)
            return Response({'book': book_serialized.data}, status=200)

        else:
            return Response({ "detail": "Book not found" }, status=404)

    return Response(status=400)