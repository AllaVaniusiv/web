from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

UPLOAD_FOLDER = 'images'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

printers = [
    {
        "id": 1,
        "title": "HP LaserJet Pro M15w Wireless Printer",
        "text": "The HP LaserJet Pro M15w is a compact wireless monochrome printer designed for small spaces and easy printing from virtually anywhere. It offers fast printing speeds, wireless connectivity, and energy-saving features, making it an ideal choice for personal or small office use.",
        "image": "printer4.jpg",
        "price": 7580,
        "category": "led",
        "quantity": 28,
    },
    {
        "id": 2,
        "title": "HP DeskJet 3755 All-in-One Printer",
        "text": "The HP DeskJet 3755 is a space-saving all-in-one printer designed to fit your space and life. It allows wireless printing, scanning, and copying. With a compact design and vibrant color options, it's suitable for modern, dynamic spaces.",
        "image": "printer5.jpg",
        "price": 5690,
        "category": "laser",
        "quantity": 45,
    },
    {
        "id": 3,
        "title": "HP OfficeJet 250 All-in-One Portable Printer",
        "text": "The HP OfficeJet 250 is a portable all-in-one printer designed for on-the-go professionals. It offers printing, scanning, and copying in a compact, mobile form factor. With a long-lasting battery and wireless connectivity, it's perfect for those needing printing capabilities while traveling.",
        "image": "printer6.jpg",
        "price": 10500,
        "category": "inkjet",
        "quantity": 30,
    },
    {
        "id": 4,
        "title": "HP ENVY 5055 Wireless All-in-One Printer",
        "text": "The HP ENVY 5055 is an all-in-one printer built for printing high-quality photos and documents. It supports wireless printing, double-sided printing, and quick setup with the HP Smart app, making it a versatile and user-friendly choice for home use.",
        "image": "printer7.jpg",
        "price": 12350,
        "category": "laser",
        "quantity": 25,
    },
    {
        "id": 5,
        "title": "HP Color LaserJet Pro MFP M281fdw",
        "text": "The HP Color LaserJet Pro MFP M281fdw is a multifunction color laser printer ideal for small to medium-sized businesses. It offers fast printing, scanning, copying, and faxing, along with automatic double-sided printing and wireless connectivity.",
        "image": "printer8.jpg",
        "price": 7830,
        "category": "led",
        "quantity": 50,
    },
    {
        "id": 6,
        "title": "HP OfficeJet Pro 8025 All-in-One Printer",
        "text": "The HP OfficeJet Pro 8025 is an all-in-one printer designed for productivity with smart tasks and the ability to print, scan, copy, and fax. It features automatic double-sided printing and is equipped for easy mobile printing and connectivity.",
        "image": "printer9.jpg",
        "price": 9565,
        "category": "inkjet",
        "quantity": 5,
    },
    {
        "id": 7,
        "title": "HP Tango X Smart Home Printer",
        "text": "The HP Tango X is a smart home printer with a sleek design and voice-activated printing capabilities. It enables wireless, cloud-based printing and scanning from virtually anywhere. With its minimalist design, it blends seamlessly into modern home decor.",
        "image": "printer10.jpg",
        "price": 8950,
        "category": "laser",
        "quantity": 10,
    },
]
next_id = 8
current_recomends = 0

sortingFunctions = {
    "price": lambda a: a["price"],
    "name": lambda a: a["title"],
}

# CRUD operations
@app.route('/printers', methods=['GET'])
def get_printers():
    printer_id = request.args.get("id", type=int)
    if printer_id:
        printer = next((p for p in printers if p['id'] == printer_id), None)
        if printer:
            return jsonify({'printer': printer})
        return jsonify({'message': 'Printers not found'}), 404

    sort = request.args.get("sort", type=str)
    filter_option = request.args.get("filter", type=str)
    reverse_sort = request.args.get("reverse_sort", type=lambda val: val.lower() == "true")
    search = request.args.get("search", type=str)
    limit = request.args.get("limit", type=int)

    final_printers = printers.copy()

    if sort:
        final_printers = list(sorted(final_printers, key=sortingFunctions[sort]))

    if filter_option and not filter_option == "all":
        final_printers = list(filter(lambda a: a["category"] == filter_option, final_printers))
    
    if search:
        for i in final_printers.copy():
            if search.lower() not in i["title"].lower():
                final_printers.remove(i)

    if reverse_sort:
        final_printers.reverse()

    if limit:
        final_printers = final_printers[0:limit]

    return jsonify({'printers': final_printers})

@app.route("/printers/image/<name>", methods=["GET"])
def get_image(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

@app.route("/printers/recomend", methods=["GET"])
def get_recomended_printers():
    global current_recomends
    current = request.args.get("current", type=int)
    if current:
        current_recomends = current
    elif current_recomends < len(printers):
        current_recomends += 3
    else:
        current_recomends = 3
    
    return jsonify({'printers': printers[0:current_recomends], 
                    'more': False if current_recomends >= len(printers) else True})

@app.route('/printers', methods=['POST'])
def add_printer():
    global next_id
    new_printer = {
        'id': next_id,
        'title': request.json['title'],
        'text': request.json['text'],
        'image': request.json['image'],
        'price': request.json['price'],
        'category': request.json['category'],
        'quantity': request.json['quantity'],
    }
    printers.append(new_printer)
    next_id += 1
    return jsonify({'message': 'Printer added', 'printer': new_printer}), 201

@app.route('/printers/<int:printer_id>', methods=['PUT'])
def update_printer(printer_id):
    printer = next((p for p in printers if p['id'] == printer_id), None)
    if printer:
        printer['title'] = request.json['title']
        printer['text'] = request.json['text']
        printer['image'] = request.json['image']
        printer['price'] = request.json['price']
        printer['category'] = request.json['category']
        printer['quantity'] = request.json['quantity']
        return jsonify({'message': 'Printer updated', 'printer': printer})
    return jsonify({'message': 'Printer not found'}), 404

@app.route('/printers/<int:printer_id>', methods=['DELETE'])
def delete_printer(printer_id):
    global printers
    printers = [p for p in printers if p['id'] != printer_id]
    return jsonify({'message': 'Printer deleted'})

@app.route('/calculate-paper', methods=['POST'])
def calculate_paper():
    data = request.json
    total_paper = sum(printer['paperTrayCapacity'] for printer in data)
    return jsonify({'totalPaper': total_paper})


@app.route('/sort-printers', methods=['POST'])
def sort_printers():
    data = request.json
    if 'field' in data and data['field'] in ['name', 'type', 'paperTrayCapacity']:
        sorted_printers = sorted(printers, key=lambda x: x[data['field']])
        return jsonify({'printers': sorted_printers})
    return jsonify({'message': 'Invalid sort field'}), 400

if __name__ == '__main__':
    app.run(debug=True)