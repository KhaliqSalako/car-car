import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


from service_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://localhost:8100/api/automobiles/")
    content = json.load(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin = automobile["vin"],
            defaults = {"vin": automobile["vin"]},
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_automobiles()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
