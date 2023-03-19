from django.db.models import Count, Max, Min
from ..models import *

def get_number_of_pages(items, limit):
    """
        Returns the number of pages based on the limit of items per page.
    """
    number_of_items = items.count()
    number_of_pages = number_of_items / limit

    if number_of_pages.is_integer():
        number_of_pages = int(number_of_pages)
    else:
        number_of_pages = int(number_of_pages) + 1

    return number_of_pages

def get_page(offset, limit, items):
    """
        Returns items page based on offset and the limit of items per page.
    """
    start_index = offset
    end_index = offset + limit
    items = items[start_index:end_index]
    
    return items

def get_values_from_interval_slug(interval_slug):
    """
        Returns the minimum and maximum values from an interval slug.
    """
    [min, max] = interval_slug.split('-')
    there_is_no_max = not max

    if there_is_no_max:
        max = None

    return (min, max)

def filter_books(request, books):
    """
        Filter books by price interval, publication year interval, genres and languages and, 
        returns a QuerySet of books and their possible filters.
    """

    genres = request.GET.getlist('genre')
    languages = request.GET.getlist('language')
    price_interval = request.GET.get('price-interval')
    publication_year_interval = request.GET.get('publication-year-interval')

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
    
    there_is_genres = len(genres) > 0
    all_genres_selected = Genre.objects.all().count() == len(genres)

    # Filtering by genres
    if there_is_genres and not all_genres_selected:
        for genre in genres:
            books = books.filter(genres = genre)

    # Getting languages count
    languages_count = books.values('language').annotate(count=Count('language')).values('language', 'count').filter(count__gt=0)

    # Filtering by languages
    there_is_languages = len(languages) > 0
    all_languages_selected = len(Book.Language.choices) == len(languages)
    
    if there_is_languages and not all_languages_selected:
        books = books.filter(language__in = languages)  

    # Getting genres count
    genres_count = []
    for genre in Genre.objects.all():
        count = books.filter(genres = genre).count()
        if count > 0:
            genres_count.append({ 'genre': genre.name, 'count': count })

    # Getting price and publication year ranges
    price_range = books.aggregate(min=Min('price'), max=Max('price'))
    publication_year_range = books.aggregate(min=Min('publication_year'), max=Max('publication_year'))

    filters= {
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
            }

    return (books, filters)