@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div id="app"></div>
</div>

<script>
window.__INITIAL_STATE__ = <?php echo json_encode([
    'user' => [
    	'email' => Auth::user()->email,
    	'name' => Auth::user()->name,
    	'hasValidAccessToken' => Auth::user()->tesla_access_token !== null
    ]
]); ?>
</script>
@endsection