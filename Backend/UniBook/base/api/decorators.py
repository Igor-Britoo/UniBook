from functools import wraps
from rest_framework.response import Response

def access_token_required(function):
    @wraps(function)
    def inner(request, *args, **kwargs):
        if(request.auth is None):
            return Response({ "detail": "Unauthorized access" }, status=401)
            
        return function(request, *args, **kwargs)

    return inner