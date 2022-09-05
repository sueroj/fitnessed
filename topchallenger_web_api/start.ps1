$env:FLASK_APP = "main"

# TODO: Remove for production
$env:FLASK_ENV = "development"

# TODO: Remove for production

# Note: no-reload used for IDE debugger else prefer to enable
# flask run --no-reload 

# Default server start
flask run
