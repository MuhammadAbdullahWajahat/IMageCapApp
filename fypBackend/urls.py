from django.contrib import admin
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^main/', include('main.urls')),
    url(r'admin/', admin.site.urls),
]
