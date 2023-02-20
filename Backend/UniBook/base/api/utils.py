def get_number_of_pages(books, limit):
    """
        Returns the number of books pages based on the limit of books per page.
    """
    number_of_books = books.count()
    number_of_pages = number_of_books / limit

    if number_of_pages.is_integer():
        number_of_pages = int(number_of_pages)
    else:
        number_of_pages = int(number_of_pages) + 1

    return number_of_pages

def get_books_page(offset, limit, books):
    """
        Returns books page based on offset and the limit of books per page.
    """
    start_index = offset
    end_index = offset + limit
    books = books[start_index:end_index]
    
    return books

def get_values_from_interval_slug(interval_slug):
    """
        Returns the minimum and maximum values from an interval slug.
    """
    [min, max] = interval_slug.split('-')
    there_is_no_max = not max

    if there_is_no_max:
        max = None

    return (min, max)